import {app,router} from "./init/serverInit.js"
import seq from "sequelize"
import {Projects,ProjectsxMembers,Members, Bugs} from "./bugTracker.js"
import { response } from "express"


router.route("/addProject").post((req,res)=>{
    Projects.create({   
        ProjectName: req.body.ProjectName,
        RepositoryLink: req.body.RepositoryLink
    }).then(response=> res.json("done!"));
})



router.route("/getProjects").get((req,res)=>{
    Projects.findAll().then(result=>res.json(result)).catch(err=>error.log(err));
})


router.route("/getProjectsWithMembers").get((req,res)=>{
    Projects.findAll(
        {
            include:[Members,Bugs]
        }
    ).then(result=>res.json(result)).catch(err=>error.log(err));
})

router.route("/getMemberByName/:name").get((req,res)=>{
    Members.findAll({where:{
        MemberEmail: req.params.name
    }}).then(result=>res.json(result)).catch(err=>error.log(err));
})



router.route("/addBug").post((req,res)=>{
    Bugs.create({
        BugName: req.body.BugName,
        RepositoryLink: req.body.RepositoryLink,
        BugSeverity: req.body.BugSeverity,
        ProjectId: req.body.ProjectId,
        BugLink: req.body.link,
        BugSolutionLink: req.body.slink
    }).then(response=> res.json("done!"));
})

router.route("/addMember").post((req,res)=>{
    Members.create({
        MemberEmail: req.body.Email,
        MemberPassword: req.body.Password
      
    }).then(response=> res.json("done!"));
})




router.route("/getBugs").get((req,res)=>{
    Bugs.findAll().then(result=>res.json(result)).catch(err=>error.log(err));
})


router.route("/getBug/:id").get((request,response)=>
{
    Bugs.findByPk(request.params.id).then(res=>response.json(res));
})


router.route("/getProjectById/:id").get((request, response) => {
    Projects.findByPk(request.params.id).then(res => response.json(res));
});


router.route("/getProjectMembers/:id").get((request, response) => {
   
       const projectsArray = Projects.findByPk(request.params.id,
           {
               include: [Members]
           }
       ).then(res => response.json(res));
       

})

router.route("/addMemberToProject").post((req,res)=>{
    ProjectsxMembers.create({
        Type: req.body.Type,
        MemberId: req.body.MemberId,
        ProjectId: req.body.ProjectId
      
    }).then(response=> res.json("done!"));
})


router.route("/getProjectIdByName/:name").get((req,res)=>{

 Projects.findAll({where:{
    ProjectName:req.params.name
}}).then(resp=>res.json(resp));

})


router.route("/login/:id/:pass").get((request, response) => {
   
    const projectsArray = Members.findAll({
        where:{
            MemberEmail: request.params.id,
            MemberPassword:request.params.pass
        }
    }).then(res => response.json(res)).catch(err=>console.log(err));
    

})


router.route("/CheckIfMp/:proj/:id").get((req,res)=>{
    ProjectsxMembers.findAll({where:
    {
        MemberId:req.params.id,
        ProjectId:req.params.proj
    }}).then(resp=>res.json(resp)).catch(err=>error.log(err));
})

router.route("/addMemberToProject2").post((req,res)=>{


    const mem = Members.findAll({where:
    {
        MemberEmail: req.body.email
    }}).then(()=>{
        
        ProjectsxMembers.create({
              Type: "MP",
              MemberId: mem.Id,
              ProjectId: req.body.projId
        }).then(res=>response.json("ok")).catch(err=>error.log(err));
    })


   
})

router.route("/addMemberToProject3").post((req,res)=>{
    ProjectsxMembers.create({
        Type:"MP",
        MemberId: req.body.id,
        ProjectId: req.body.projId
    }).then(res=>response.json("ok")).catch(err=>error.log(err));
})


var port = 8000;
app.listen(port,()=>{
    console.log("Listening on port: "+ port);
})