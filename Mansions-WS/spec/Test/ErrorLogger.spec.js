// const errorLogger=require('../../src/utilities/ErrorLogger')

// describe('Testing ErrorLogger',()=>{
//     let obj={"errorLogger":errorLogger}
//     let next=()=>{}
//     beforeEach(()=>{
//         res={
//             status:undefined,
//             json:undefined,
//             status:function(status){
//                 this.status=status
//             },
//             json:function(val){
//                 this.json=val
//             }
//         }
//     })

// it("Response status set to 500 by default for Error",()=>{
//     let err=new Error("ErrorLogger test");
//     try{
//         obj.errorLogger(err,req,res,next)
//     }
//     finally{
//         expect(res.status).toEqual(500);
//     }

    
// })
// it("Response status is set using Error status",()=>{
//     let err=new Error("ErrorLogger test");
//     err.status=404;
//     try{
//         obj.errorLogger(err,req,res,next)
//     }
//     finally{
//         expect(res.status).toEqual(404)
//     }
// })

// it("Response should contain error message",()=>{
//     let err=new Error("ErrorLogger test");
//     err.status=404;
//     try{
//         obj.errorLogger(err,req,res,next)
//     }
//     finally{
//         expect(res.json.message).toEqual(err.message)
//     }
// })
// })