let Validator={};

Validator.validateEmail =(email)=>{
    let emailRegex = /^[a-z]+[0-9]*@[a-z]+\.([a-z]{2,3})(\.){0,1}([a-z]{0,2})$/
    if(!emailRegex.test(email)){    

        return false;
    }
    else{
        return true;
    }
    
}

Validator.validatePassword=(password)=>{
    let passRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/
    if(!passRegex.test(password)){      
        return false
    }else{
        return true
    }
}

Validator.validateContactNo=(contactNo)=>{
    // let contactRegex=/^[6-9][0-9]{9}$/
    // if(contactRegex.test(contactNo)){
    //     return true
    // }else{
    //     let err=new Error("Contact Number does not match");
    //     err.status=500;
    //     throw err;
    // }
}

Validator.validateName=(name)=>{
    let nameRegex=/^[a-zA-Z]+( )*[a-zA-Z]*( )*[a-zA-Z]+$/
    if(nameRegex.test(name)){
        return true
    }else{
        let err=new Error("Name does not match");
        err.status=500;
        throw err;
    }
}


module.exports = Validator;