import Sequelize from "sequelize";


const sequelize = new Sequelize(
    "bugtracker","appointment","google",{
        host:"localhost",
        dialect:"mssql",
        dialectOptions: {
            options:{
                trustedConnection: true,
                enableArithAbort: true
            }
        }

    });

export const Projects = sequelize.define("Projects",
{

    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    ProjectName:{
        type: Sequelize.STRING
    },
    RepositoryLink:{
        type: Sequelize.STRING
    }

}
)

export const ProjectsxMembers = sequelize.define("ProjectsxMembers",
{

    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    Type:{
       type: Sequelize.STRING
    }

}
)

export const Members = sequelize.define("Members",
{
    Id:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    MemberEmail:
    {
        type:Sequelize.STRING
    },
    MemberPassword:
    {
        type:Sequelize.STRING
    }
})


export const Bugs = sequelize.define("Bugs",
{
    Id:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    BugName:
    {
        type:Sequelize.STRING
    },
    BugSeverity:
    {
        type:Sequelize.INTEGER
    },
    BugLink:
    {
        type:Sequelize.STRING,
    },
    BugSolutionLink:
    {
        type:Sequelize.STRING
    }
   

});

// export const BugsLinks = sequelize.define("BugsLinks",{
//     Id:
//     {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: true
//     },
//     BugLink:
//     {
//         type:Sequelize.STRING,
//     },
//     BugSolutionLink:
//     {
//         type:Sequelize.STRING
//     }
// })

//Projects.hasMany(ProjectsxMembers);
//Members.hasMany(ProjectsxMembers);
// Bugs.hasMany(BugsLinks);
Projects.hasMany(Bugs);

Projects.belongsToMany(Members,{through:"ProjectsxMembers"});
Members.belongsToMany(Projects,{through:"ProjectsxMembers"});



sequelize.authenticate().then(()=>{
    console.log("Connected to the database!")
}).catch(err => console.error(err));

sequelize.sync({force:false,alter:false}).then(()=>
{
    console.log("Database synced!");
}).catch(err=>console.error(err));


