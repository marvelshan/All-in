# All-in

**High-traffic-capacity online sports betting platform development.**

## Project Overview

All-in is a high-traffic-capacity online sports betting platform developed to provide a seamless and engaging experience for users. The platform leverages cutting-edge technologies to ensure optimal performance, scalability, and real-time communication.

## Project Address

Visit [All-in](https://www.ygolonhcet.online/) to experience the platform.

## Key Features

### Node.js Server Architecture

![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

- Utilized the Node.js environment to architect a robust server.
- Implemented a load balancer to enhance performance and distribute incoming traffic efficiently.

### AWS Auto-Scaling

![](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

- Addressed high concurrency challenges by employing AWS's auto-scaling features.
- Dynamically adjusted website resources to optimize response to varying traffic loads.

### Database Management

![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

- Employed MySQL as the database solution for storing user data and bet information.
- Seamless integration with AWS cloud services, specifically Amazon RDS, to ensure scalability and efficiency.

### Real-time Chatroom

![](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

- Implemented a real-time chatroom functionality using Socket.IO.
- Established seamless communication between the client and server sides.

### Redis for Rapid Data Storage

![](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

- Orchestrated the use of Redis for rapid data storage.
- Integrated AWS's ElastiCache to facilitate seamless communication among distributed servers.

### Web Crawler for NBA Game Information

![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

- Developed a web crawler using the NPM package Cheerio.
- Systematically gathered and presented NBA game information on the platform.
  ![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/architecture.png)

## Testing result

To ensure optimal performance under high traffic loads, we've implemented a strategic server scaling plan. Three T2 micro instances are scheduled to be activated during peak traffic periods, allowing the platform to handle a maximum of 669 requests per second (RPS). This proactive approach is particularly crucial during game endings, where traffic tends to surge.

### Server Configuration

- Instance Type: T2 Micro
- Number of Instances: 3
- Activation Period: Scheduled to open during high-traffic hours, specifically during game endings.
  Maximum Request
- Handling Capacity: 669 RPS

### Cost Analysis

The cost of this scalable infrastructure has been meticulously assessed. The projected monthly cost for this configuration is estimated at $15.052 USD. This includes the expenses associated with running three T2 micro instances during the specified activation period.

### Scaling out

| Name       | Cost   | RPS    | Success rate |
| ---------- | ------ | ------ | ------------ |
| t2micro\*1 | 0.0152 | 457.60 | 34           |
| t2micro\*2 | 0.0304 | 672.28 | 94           |
| t2micro\*3 | 0.0456 | 669.89 | 100          |

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/scalingOut.png)

### Scaling up

| name        | cost   | RPS    | Success rate |
| ----------- | ------ | ------ | ------------ |
| t2micro\*1  | 0.0152 | 457.60 | 34           |
| t2small\*1  | 0.0304 | 592.69 | 53           |
| t2medium\*1 | 0.0608 | 670.38 | 85           |
| t2large\*1  | 0.1216 | 742.85 | 94           |
| t2xlarge\*1 | 0.2432 | 686.09 | 98.8         |
| t3micro\*1  | 0.0136 | 556.99 | 85           |
| t3small\*1  | 0.0272 | 492.28 | 90           |
| t3medium\*1 | 0.0544 | 557.21 | 93           |
| t3large\*1  | 0.1088 | 656.60 | 95           |
| t3xlarge\*1 | 0.2176 | 609.82 | 98.9         |

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/scalingUp.png)

# Wrbsite Introduction

## Homepage Overview

The homepage is divided into three main sections:

**Prominent Advertisements:** Engaging advertisements that capture the attention of users.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/readmepart1.png)

**Live Events:** Information about ongoing sports events.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/readmepart2.png)

**Upcoming Matches:** Details about upcoming matches.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/readmepart3.png)

## Betting Interface

**Center Section:** This area facilitates the betting process, providing odds for users to make informed decisions.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/gamePage.png)

**Right Section:** Presents the user's betting history and personal information. Additionally, there is a button to seamlessly switch to the chat room.

- **user information**

<img src="https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/userInfor.png" width="200"/>

- **chatroom**

<img src="https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/chatroom.png" width="200"/>

## Platform Insights

A crucial aspect of the platform involves insights for platform administrators. Notably, a bar chart visualizes the total amount the platform must pay out, calculated by multiplying user bets by the corresponding odds.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/adminbar.png)

## Acknowledgments

### Gratitude to AppWorks School

I extend my heartfelt gratitude to AppWorks School for providing a transformative learning journey that empowered me to successfully complete the All-in Sports Betting Platform project. The comprehensive curriculum, guidance, and mentorship have been instrumental in honing my skills as a backend developer.

### Thanks to Supportive Classmates

A special thank you to my classmates for their invaluable advice and support throughout this project. Whenever challenges arose, their willingness to share insights and lend a helping hand made the journey more manageable and enjoyable.

### Appreciation for Mentor Jam

I would like to express my sincere appreciation to our mentor, Jam, whose consistent presence and guidance played a pivotal role in supervising my project schedule. Jam's insights and encouragement have been a source of inspiration, ensuring that the project stayed on track and met its goals.

### Learning and Looking Forward

This project has been a rich learning experience, exposing me to a plethora of tools and methodologies. As I move forward, I am eager to apply these newfound skills to future projects. The ethos cultivated at AppWorks School will remain ingrained in my work, and I am committed to contributing my skills to the vibrant tech community in Taiwan.

Thank you, AppWorks School, classmates, and mentor, for this invaluable experience and the knowledge that will propel me forward in my journey as a developer.

<hr>

Feel free to use this adjusted version or make any further changes based on your preferences.
