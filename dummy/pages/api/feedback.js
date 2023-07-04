import path from 'path';
import fs from 'fs';

function handler(req,res){

    if(req.method==="POST"){
        const email = req.body.email;
        const feedback= req.body.text;

        const newFeedback= {
            id: Date.now().toString(),
            email:email,
            text:feedback
        }

        const filePath = path.join(process.cwd(),'data','feedback.json');
        const fileData = fs.readFileSync(filePath);
        let data = JSON.parse(fileData) || [];
        data.push(newFeedback);
        fs.writeFileSync(filePath ,JSON.stringify(data));
        res.status(201).json({message:"Success",feedback:newFeedback});
    }
    else{
        res.status(200).json({msg:'hello world'})
    }
}

export default handler