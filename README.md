# All-in

**High-traffic-capacity online sports betting platform development.**

## Project Overview

All-in is a high-traffic-capacity online sports betting platform developed to provide a seamless and engaging experience for users. The platform leverages cutting-edge technologies to ensure optimal performance, scalability, and real-time communication.

## Project Address

Visit [All-in](https://www.ygolonhcet.online/) to experience the platform.

## Key Features

### Node.js Server Architecture

- Utilized the Node.js environment to architect a robust server.
- Implemented a load balancer to enhance performance and distribute incoming traffic efficiently.

### AWS Auto-Scaling

- Addressed high concurrency challenges by employing AWS's auto-scaling features.
- Dynamically adjusted website resources to optimize response to varying traffic loads.

### Database Management

- Employed MySQL as the database solution for storing user data and bet information.
- Seamless integration with AWS cloud services, specifically Amazon RDS, to ensure scalability and efficiency.

### Real-time Chatroom

- Implemented a real-time chatroom functionality using Socket.IO.
- Established seamless communication between the client and server sides.

### Redis for Rapid Data Storage

- Orchestrated the use of Redis for rapid data storage.
- Integrated AWS's ElastiCache to facilitate seamless communication among distributed servers.

### Web Crawler for NBA Game Information

- Developed a web crawler using the NPM package Cheerio.
- Systematically gathered and presented NBA game information on the platform.
  ![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/architecture.png)

## Testing result

### Scaling out

| Name       | Cost   | RPS    | Success rate |
| ---------- | ------ | ------ | ------------ |
| t2micro\*1 | 0.0152 | 457.60 | 34           |
| t2micro\*2 | 0.0304 | 672.28 | 94           |
| t2micro\*3 | 0.0456 | 669.89 | 100          |

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

**Center Section:** This area facilitates the betting process, providing odds for users to make informed decisions. A simple illustration: if a player bets 1000 units at a given odds, they stand to win 1000 times the odds if successful.
![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/gamePage.png)

**Right Section:** Presents the user's betting history and personal information. Additionally, there is a button to seamlessly switch to the chat room.

**user information**
![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/userInfor.png)
**chatroom**
![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/chatroom.png)

## Platform Insights

A crucial aspect of the platform involves insights for platform administrators. Notably, a bar chart visualizes the total amount the platform must pay out, calculated by multiplying user bets by the corresponding odds.

![](https://d3qptsb2ee7s4x.cloudfront.net/ReadMeImage/adminbar.png)
