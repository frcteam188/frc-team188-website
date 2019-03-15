const squel = require("squel").useFlavour('postgres');
// SELECT * FROM 
// (SELECT 
//     robot,
//     MAX(CASE WHEN phase='sandstorm' AND success='scored' THEN level END) AS mobility,
//     MAX(CASE WHEN phase='tele' AND success='scored' THEN level END) AS climb
//     FROM ryerson.habs GROUP BY robot) AS robot_habs
// NATURAL JOIN
//   (SELECT robot,    
//     COUNT(CASE WHEN piece='hatch' AND phase='sandstorm' THEN 1 END)/AVG(sub_count) AS sandstorm_hatch,
//     COUNT(CASE WHEN piece='cargo' AND phase='sandstorm' THEN 1 END)/AVG(sub_count) AS sandstorm_cargo,
//     COUNT(CASE WHEN piece='hatch' AND score~'cargo' THEN 1 END)/AVG(sub_count) AS cargo_hatch,
//     COUNT(CASE WHEN piece='cargo' AND score~'cargo' THEN 1 END)/AVG(sub_count) AS cargo_cargo,
//     COUNT(CASE WHEN piece='hatch' AND score~'rocket' THEN 1 END)/AVG(sub_count) AS rocket_hatch,
//     COUNT(CASE WHEN piece='cargo' AND score~'rocket' THEN 1 END)/AVG(sub_count) AS rocket_cargo
// FROM ryerson.cycles, 
// (SELECT robot AS number, COUNT(CASE 
//     WHEN r1=robot AND r1_status='submitted' THEN 1 
//     WHEN r2=robot AND r2_status='submitted' THEN 1 
//     WHEN r3=robot AND r3_status='submitted' THEN 1 
//     WHEN b1=robot AND b1_status='submitted' THEN 1 
//     WHEN b2=robot AND b2_status='submitted' THEN 1 
//     WHEN b3=robot AND b3_status='submitted' THEN 1 
//     END) AS sub_count
//     FROM ryerson.schedule, ryerson.teams
//     WHERE r1=robot OR r2=robot OR r3=robot OR b1=robot OR b2=robot OR b3=robot
//     GROUP BY robot) AS match_count
//  WHERE MATCH = 1  AND robot=number GROUP BY robot) AS robot_cycles
const TOURNAMENT_NAME='ryerson';
const SCHEDULE = TOURNAMENT_NAME + '.schedule';
const CYCLES = TOURNAMENT_NAME + '.cycles';
const HABS = TOURNAMENT_NAME + '.habs';
const TEAMS = TOURNAMENT_NAME + '.teams';
const stationStatusMap = {'r1': 'r1_status', 'r2': 'r2_status', 'r3': 'r3_status', 'b1': 'b1_status', 'b2': 'b2_status', 'b3': 'b3_status'}; // use map to prevent injection
exports.getMatch = matchNumber => squel.select().from(SCHEDULE).where('match = ?', matchNumber).toParam();

exports.updateMatchSubmitted = (matchNumber, station) => {
    return squel.update().table(SCHEDULE).set(stationStatusMap[station], 'submitted').where('match = ?', matchNumber).toParam();
}
exports.clearCycles = (matchNumber, teamNumber) => squel.delete().from(CYCLES).where('match = ?', matchNumber).where('robot = ?', teamNumber).toParam();
exports.insertCycles = cycles => squel.insert().into(CYCLES).setFieldsRows(cycles).toParam();

exports.clearHabs = (matchNumber, teamNumber) => squel.delete().from(HABS).where('match = ?', matchNumber).where('robot = ?', teamNumber).toParam();
exports.insertHabs =  habs => squel.insert().into(HABS).setFieldsRows(habs).toParam();
stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3']
const robotInMatch = () => {
    var temp = squel.expr();
    stations.forEach(station=>temp = temp.or(station + '=robot'));
    console.log(temp.toString());
    return temp.toString();
}
const robotMatchSubmitted = () => {
    var temp = squel.case();
    stations.forEach(station=>temp = temp.when(station + '=robot and '+ stationStatusMap[station] + '=\'submitted\'').then(1));
    return temp.toString();
}
const match_count = 

exports.submittedMatchCount = squel
    .select()
    .field('robot AS number')
    .field('COUNT(' + robotMatchSubmitted() + ')', 'sub_count')
    .from(SCHEDULE).cross_join(TEAMS)
    .where(robotInMatch())
    .group('robot').toParam();
    
exports.getAverages = matchNumber => {

}

console.log(match_count.text)