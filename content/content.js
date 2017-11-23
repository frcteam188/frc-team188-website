var routes = require('./routes.json');
var menu = require('./menu.json');

var content = (function(){
  obj = {};

  obj.home = {
    "menu": menu,
    "description":
      ['Team 188 Woburn Robotics is a high school robotics team from Woburn Collegiate Institute in Scarborough, Ontario. Woburn Robotics participates in the FIRST Robotics Competition and VEX Robotics Competition each year.',
       'As part of the world’s largest high school robotics competition (FRC), Woburn Robotics strives to spread the message of FIRST at every opportunity, promoting an interest in science, technology, and engineering.',
       '1995 was the first year of competition through Canada FIRST and since then, Woburn Robotics has inspired almost two decades worth of innovation and education at Woburn C.I. Generations of students have graduated and moved onto STEM related careers. Team 188 alumni have gone on to become industry leaders, engineers, lawyers, educators and medical professionals.'
      ],
    "routes" : routes
  };

  obj.about = {
      "menu" : menu,
      "paras" : [
        {"title" : "About Us",
         "para" : [
           "Team 188 Woburn Robotics was established in 1995 through the work of a group of passionate teachers, community members and students.",
           "\n",
           "Woburn Robotics has experienced great growth in the 23 years of our existence. Participating in Canada FIRST (For Inspiration and Recognition of Science and Technology) for two years, led us to U.S. FIRST, the largest school robotics competition on the planet, where we represented Canada. The participation and success of Team 188 as the first non-American team in FIRST paved the way for numerous other teams from both Canada and around the world to join the competition. Hundreds of teams as well as the Ontario District regionals and championships have emerged since Team 188 became involved with FIRST. This expansion and subsequent popularity in Canada led to the creation of FIRST Canada, with Ontario becoming one of the most competitive and world-renowned districts. Being the first Canadian team to participate in FIRST, our success has served as inspiration not only to other teams, but international competitors as well. During our almost twenty years participating in FIRST, our team has received some of the most prestigious awards presented in FIRST during various regional events.",
           "\n",
           "Team 188 has always set out to create its own path in the world of robotics. Having the distinction of being the first Canadian team to enter US FIRST in 1998 as well as having founded the Greater Toronto Regional, Team 188 has transformed into a leader, mentor, and a role model for other teams in Canada and the United States. The team spirit, cooperation, and homely atmosphere of Team 188 have produced stellar results, such as a Championship Woodie Flowers award, Regional Chairman’s awards, Regional Championships, and World Championship finalists. Team 188 has always taken the initiative to grow stronger in its prestigious 23-year history and with its mindset of innovation and humility, Team 188 will continue to be the ‘Force from the North’ for years to come.",
           " ",
           "As a FIRST robotics team, Woburn Robotics values:",
           "\n",
           "•Gracious professionalism",
           "•Cooperation and teamwork in competition; coopertition",
           "•Creativity and innovation",
           "•The importance of science and technology",
           "•Community involvement",
           "•Availing unique experiences"
        ]
       },
       {"title" : "Outreach",
        "para" : [
          "Even with these honours, Team 188 has always strived to further FIRST in Canada, by mentoring local schools and creating new teams in Toronto.",
          "\n",
          "Team 188 hosts two robotics tournaments in the offseason, the FLL Qualifier and the VEX Regional Tournaments are held at Woburn CI.",
          "\n",
          "Team 188 participates in various outreach opportunities at local middle and elementary schools, girl guide groups, and robot demonstrations throughout the year. These demonstrations give community members the unique opportunity to interact with the robot and learn about the FIRST Robotics Competition.",
          "\n",
          "Team 188 instills a culture of giving back within its members. Ontario District FRC competitions are largely organized and run by 188 alumni. 188 Alumni and members make up a large portion of FIRST Canada’s Key Volunteer list. Alumni hold roles as Directors, Planning Committee Members, FTAs, Volunteer Coordinators, LRIs, CSAs and Head Referees. Through our expansive alumni network, there are 188 volunteers at each of Ontario’s district events, championships and World Championships in St Louis.",
        ]
      },
       {
         "title" :  "Team Structure ",
         "para" : [
           "Woburn Robotics is composed of approximately 50 student members, 15 university and adult mentors, a team of 4 teachers, and all of our family, friends, and sponsors.",
           "The team comes together at the end of every build season to celebrate the accomplishments of the students and the contributions of our sponsors."
        ]
      },
       {
         "title" : "FIRST",
         "para" : [
           "FIRST was founded in 1989 by inventor Dean Kamen to inspire young people’s interest and participation in science and technology. Based in Manchester, N.H., the 501 (c) 3 not-for-profit organization designs accessible, innovative programs to build self-confidence, knowledge, and life skills while motivating young people to pursue opportunities in science, technology, engineering, and math.",
           "\n",
           "FIRST provides two well-known programs, the FIRST Robotics Competition (FRC) for high school-aged young people and FIRST LEGO League (FLL) for 9 to 14 year-olds.",
           "\n",
           "The FIRST Robotics Competition is an annual competition that helps young people discover the rewards and excitement of education and careers in science, engineering, and technology. FRC challenges high-school-aged young people – working with professional mentors - to design and build a robot, and compete in high-intensity events that measure the effectiveness of each robot, the power of team strategy and collaboration, and the determination of students.",
           "\n",
           "FIRST LEGO League introduces 9 to 14 year-olds (9 to 16 outside North America) to the fun and experience of solving real-world problems by applying math, science, and technology. FIRST LEGO League is an international program for children created in a partnership between FIRST and the LEGO Group in 1998. Each September, FLL announces the annual Challenge to teams, which engages them in authentic scientific research and hands-on robotics design using LEGO MINDSTORMS and NXT technologies. After 8 intense weeks, the FLL season culminates at high-energy, sports-like tournaments. Woburn is proud to host FLL Qualifiers for local FLL teams for the past decade."
          ]
        }

     ],
     "routes" : routes
  }
  //
  // obj.first = {
  //   "menu" : menu,
  //   "routes" : routes
  //
  // };

  obj.community = {
    "menu" : menu,
    "routes" : routes
  };

  // obj.vex = {
  //   "menu" : menu,
  //   "paras" : [
  //     {
  //       "title" : "Vex Robotics Competition",
  //       "para" : "Every year Team 188 competes in our annual Vex Robotics Tournament. Here are some of the robots we have made in the past."
  //     }
  //   ],
  //   "routes" : routes
  // };

  obj.sponsors = {
    "menu" : menu,
    "paras" : [
      {
        "title" : "Our Sponsors",
        "para" : "Our team is incredibly gratefull for all of our sponsors and their role in making Team 188 possible."
      }
    ],
    "routes" : routes,
    "sponsors": [
      {"name" : "TDSB",
      "image" : "https://imgur.com/J6fhamP.jpg"},
      {"name" : "Scotiabank",
      "image" : "https://imgur.com/Jd3OE1v.jpg"},
      {"name" : "Impark",
      "image" : "https://imgur.com/fhcc4np.jpg"},
    ]
  };

  obj.scouting = {
    "matchNumber" : 1,
    "station" : "r1",
    "teamNumber" : "1241"
  };

  return obj;

});

module.exports = {
  'content' : content
};
