const squel = require("squel").useFlavour('postgres');

const TOURNAMENT_NAME='dcmp';
const SCHEDULE = TOURNAMENT_NAME + '.schedule';
const CYCLES = TOURNAMENT_NAME + '.cycles';
const HABS = TOURNAMENT_NAME + '.habs';
const TEAMS = TOURNAMENT_NAME + '.teams';

const COUNT = 'COUNT', MAX='MAX', MIN='MIN';

const stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3']
const stationStatusMap = {'r1': 'r1_status', 'r2': 'r2_status', 'r3': 'r3_status', 'b1': 'b1_status', 'b2': 'b2_status', 'b3': 'b3_status'}; // use map to prevent injection

exports.getMatch = matchNumber => squel.select().from(SCHEDULE).where('match = ?', matchNumber).toParam();

exports.updateMatchSubmitted = (matchNumber, station) => {
    return squel.update().table(SCHEDULE).set(stationStatusMap[station], 'submitted').where('match = ?', matchNumber).toParam();
}
exports.clearCycles = (matchNumber, teamNumber) => squel.delete().from(CYCLES).where('match = ?', matchNumber).where('robot = ?', teamNumber).toParam();
exports.insertCycles = cycles => squel.insert().into(CYCLES).setFieldsRows(cycles).toParam();

exports.clearHabs = (matchNumber, teamNumber) => squel.delete().from(HABS).where('match = ?', matchNumber).where('robot = ?', teamNumber).toParam();
exports.insertHabs =  habs => squel.insert().into(HABS).setFieldsRows(habs).toParam();

exports.insertMatch = match => squel
    .insert()
    .into(SCHEDULE)
    .set('match', match.number)
    .set('r1', match.r1)
    .set('r2', match.r2)
    .set('r3', match.r3)
    .set('b1', match.b1)
    .set('b2', match.b2)
    .set('b3', match.b3)
    .set('r1_status', 'none')
    .set('r2_status', 'none')
    .set('r3_status', 'none')
    .set('b1_status', 'none')
    .set('b2_status', 'none')
    .set('b3_status', 'none')
    .toParam();

exports.getPreMatchAverages = matchNumber => {
    const text = 
`SELECT * FROM 
(SELECT 
    robot,
    MAX(CASE WHEN phase='sandstorm' AND success='scored' THEN level END) AS mobility,
    MAX(CASE WHEN phase='tele' AND success='scored' THEN level END) AS climb
    FROM dcmp.habs GROUP BY robot) AS robot_habs
NATURAL JOIN
  (SELECT robot,    
    ROUND(COUNT(CASE WHEN piece='hatch' AND phase='sandstorm' THEN 1 END)/AVG(sub_count), 2) AS sandstorm_hatch,
    ROUND(COUNT(CASE WHEN piece='cargo' AND phase='sandstorm' THEN 1 END)/AVG(sub_count), 2) AS sandstorm_cargo,
    ROUND(COUNT(CASE WHEN piece='hatch' AND score~'cargo' THEN 1 END)/AVG(sub_count), 2) AS cargo_hatch,
    ROUND(COUNT(CASE WHEN piece='cargo' AND score~'cargo' THEN 1 END)/AVG(sub_count), 2) AS cargo_cargo,
    ROUND(COUNT(CASE WHEN piece='hatch' AND score~'rocket' THEN 1 END)/AVG(sub_count), 2) AS rocket_hatch,
    ROUND(COUNT(CASE WHEN piece='cargo' AND score~'rocket' THEN 1 END)/AVG(sub_count), 2) AS rocket_cargo
FROM dcmp.cycles, 
(SELECT robot AS number, COUNT(CASE 
    WHEN r1=robot AND r1_status='submitted' THEN 1 
    WHEN r2=robot AND r2_status='submitted' THEN 1 
    WHEN r3=robot AND r3_status='submitted' THEN 1 
    WHEN b1=robot AND b1_status='submitted' THEN 1 
    WHEN b2=robot AND b2_status='submitted' THEN 1 
    WHEN b3=robot AND b3_status='submitted' THEN 1 
    END) AS sub_count
    FROM (dcmp.schedule NATURAL JOIN (SELECT ARRAY[r1, r2, r3, b1, b2, b3] AS robots FROM dcmp.schedule WHERE MATCH = $1) AS robot_list), dcmp.teams
    WHERE (r1=robot OR r2=robot OR r3=robot OR b1=robot OR b2=robot OR b3=robot) AND robot=ANY(robots)
    GROUP BY robot) AS match_count
 WHERE robot=number GROUP BY robot) AS robot_cycles
 `
    values = [matchNumber];
    return {text, values};
}

// const getExpressionAND = conditions => {
//     var temp = squel.expr();
//     conditions.forEach(condition => temp = temp.and(condition));
//     return temp.toString();
// }

// const getExpressionOR = conditions => {
//     var temp = squel.expr();
//     conditions.forEach(condition => temp = temp.or(condition));
//     return temp.toString();
// }

// const getCase = expressions => {
//     var temp = squel.case();
//     expressions.forEach(expression => temp = temp.when(expression).then(1));
//     return temp.toString();
// }
// const getAggregate = (type, cases) => {
//     return type + '(' + cases + ')';
// }

// const getCount = (cases) => getAggregate(COUNT, cases);


// const getSubmittedMatchCount = () => squel
//     .select()
//     .field('robot', 'number')
//     .field(getCount(getCase(stations.map(station=>getExpressionAND([station+'=robot', stationStatusMap[station]+'=\'submitted\''])))), 'sub_count')
//     .from(SCHEDULE).cross_join(TEAMS)
//     .where(getExpressionOR(stations.map(station=>station+'=robot')))
//     .group('robot');
    
// const addFields = (fields, query) => {
//     fields.map(field=>query=query.field(...field))
//     return query;
// }

// const getAverages = matchNumber => {
//     const pieces = ['hatch', 'cargo'];
//     var temp = squel
//         .select()
//         .from(CYCLES).cross_join(getSubmittedMatchCount(), 'match_count')
//         .field('robot');
//         temp = addFields(pieces.map(piece=>[getCount(getCase([getExpressionAND(['piece=\''+piece+'\'', 'phase=\'sandstorm\''])]))+'/AVG(sub_count)', 'sandstorm_'+piece]), temp)
//         temp = addFields(pieces.map(piece=>[getCount(getCase([getExpressionAND(['piece=\''+piece+'\'', 'score~\'cargo\''])]))+'/AVG(sub_count)', 'cargo_'+piece]), temp)
//         temp = addFields(pieces.map(piece=>[getCount(getCase([getExpressionAND(['piece=\''+piece+'\'', 'score~\'rocket\''])]))+'/AVG(sub_count)', 'rocket_'+piece]), temp)
//         .where(getExpressionAND(['match='+matchNumber, 'robot=number']))
//         .group('robot')
//     return temp;
// }

// exports.getPreMatchAverages = matchNumber => {
    
//     const habs = squel
//         .select()
//         .from(HABS)
//         .field('robot')
//         .field(getAggregate(MAX, getCase([getExpressionAND(["phase='sandstorm'", "success='scored'"])])), 'mobility')
//         .field(getAggregate(MAX, getCase([getExpressionAND(["phase='tele'", "success='scored'"])])), 'climb')
//         .group('robot');
    
//     return squel.select().from(habs, 'robot_habs').join(getAverages(matchNumber), 'robot_cycles').toParam();

//     // SELECT * FROM 
//     // (SELECT 
//     //     robot,
//     //     MAX(CASE WHEN phase='sandstorm' AND success='scored' THEN level END) AS mobility,
//     //     MAX(CASE WHEN phase='tele' AND success='scored' THEN level END) AS climb
//     //     FROM dcmp.habs GROUP BY robot) AS robot_habs
// }

exports.getCycles = (teamNumber) => squel.select().from(CYCLES).where('robot = ?', teamNumber).toParam();


// console.log(match_count.text)
// console.log(exports.getSubmittedMatchCount().text)
// console.log(exports.getPreMatchAverages(1).text)
