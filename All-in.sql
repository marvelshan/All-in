
DROP TABLE IF EXISTS `topup_table`;
DROP TABLE IF EXISTS `bet`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `NBA_standing`;
DROP TABLE IF EXISTS `NBA_TEAM`;
DROP TABLE IF EXISTS `NBA_Game`;
DROP TABLE IF EXISTS `NBA_game_log`;




CREATE TABLE `NBA_TEAM` (
  `TEAM_ID` INT PRIMARY KEY,
  `TEAM_ABBR` VARCHAR(255)
);

CREATE TABLE `NBA_Game` (
  `id` INT,
  `home_pts` VARCHAR(255),
  `away_pts` VARCHAR(255),
  `home_team_id` INT,
  `away_team_id` INT
);

CREATE INDEX idx_nba_game_id ON NBA_Game (id);
CREATE TABLE `NBA_game_log` (
  `evt` VARCHAR(255),
  `wallclk` VARCHAR(255),
  `cl` VARCHAR(255),
  `de` VARCHAR(255),
  `locX` VARCHAR(255),
  `locY` VARCHAR(255),
  `tid` INT,
  `pid` VARCHAR(255),
  `hs` INT,
  `vs` INT,
  `pts` INT,
  `period` VARCHAR(255),
  `GAME_ID` INT,
  FOREIGN KEY (`tid`) REFERENCES `NBA_TEAM` (`TEAM_ID`),
  FOREIGN KEY (`GAME_ID`) REFERENCES `NBA_Game` (`id`)
);

CREATE TABLE `NBA_standing` (
  `id` INT AUTO_INCREMENT PRIMARY KEY ,
  `TEAM_ID` VARCHAR(255),
  `win` INT,  -- Assuming `win` and `lose` are counts, so using INT instead of VARCHAR(255)
  `lose` INT
);

CREATE TABLE `not_order_NBA_standing` (
  `id` INT AUTO_INCREMENT PRIMARY KEY ,
  `TEAM_ID` VARCHAR(255),
  `win` INT,  -- Assuming `win` and `lose` are counts, so using INT instead of VARCHAR(255)
  `lose` INT
);

CREATE TABLE `topup_table` (
  `id` INT PRIMARY KEY,
  `point` INT,
  `time` TIME
);

CREATE TABLE `bet` (
   `id` INT PRIMARY KEY,
  `GAME_ID` INT,
  `betting_point` INT,
  `betting_odds` VARCHAR(255),
  `result` BOOLEAN,
  FOREIGN KEY (`GAME_ID`) REFERENCES `NBA_Game` (`id`)
);

CREATE TABLE `member` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  top_up_id INT,
   bet_id INT,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `token` VARCHAR(255),
  `point` INT,
  `winning_rate` DECIMAL(5,2),
  FOREIGN KEY (`top_up_id`) REFERENCES `bet` (`id`),
  FOREIGN KEY (`bet_id`) REFERENCES `topup_table` (`id`)
);

DROP TABLE IF EXISTS `odds`;

CREATE TABLE `odds` (
  `id` BIGINT UNSIGNED PRIMARY KEY,
   home_odds DECIMAL(3,2),
   away_odds DECIMAL(3,2),
  `moneyBuffer` INT);

SELECT * FROM NBA_standing ORDER BY lose;
SELECT * FROM odds;
SELECT * FROM NBA_standing;
SELECT * FROM NBA_Game;
SELECT * FROM NBA_game_log;
SELECT * FROM team_mapping;
SELECT * FROM NBA_TEAM;