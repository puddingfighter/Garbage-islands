use dbname;

create table Users(
	UserId int not null auto_increment,
    UserName varChar(255) not null,
    UserExp float not null,
    Password nvarChar(255) not null,
    Age int not null,
    primary key (UserId)
);

Create Table Island(
	IslandId int not null auto_increment,
    UserId int not null,
    Resources float,
    foreign key (UserId) references Users(UserId),
	primary key (IslandId)
);
Create table Tile(
	TileId int not null auto_increment,
    TileX float not null,
    TileY float not null,
    IslandId int not null,
    GarbageLevel float,
	TileType int not null,
    TimeBuild timestamp,
    TimeProduce timestamp,
    primary key (TileId),
    foreign key (IslandId) references Island (IslandId)
);
create Table Achievement(
	AchievementId int not null,
    UserId int,
    AchievementDate date
);






select * from Tile;
select * from Island;
select * from Achievement;

insert into Users (UserId, UserName, Age)
values (0, 'Dias', 18);
insert into Island(IslandId, UserId)
values (0, 0);

insert into Tile (TileId, IslandId, GarbageLevel, Ocupied, TimeBuild, TimeProduce)
values (0,0, 3.6, true, null, '2018-04-20 08:20:20');

insert into Tile (TileId, IslandId, GarbageLevel, Ocupied, TimeProduce)
values (1,1, 3.6, true , '2018-04-20 08:20:20');

insert into Tile (TileId, IslandId, GarbageLevel, Ocupied, TimeBuild)
values (2,2, 1.1, false, '2018-04-20 08:40:20');

insert into  Achievement(AchievementId, UserId, AchievementDate)
values (0,0,  '2018-04-20');

