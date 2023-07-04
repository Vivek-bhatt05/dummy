import path from 'path';
import fs from 'fs';

export function buildFeedbackPath(){
    return path.join(process.cwd(),'data','feedback.json');
}

export function extraxtFeedback(filePath){
    const fileData = fs.readFileSync(filePath);
    let data = JSON.parse(fileData);

    return data
}

function handler(req,res){

    if(req.method==="POST"){
        const email = req.body.email;
        const feedback= req.body.text;

        const newFeedback= {
            id: Date.now().toString(),
            email:email,
            text:feedback
        }

        const filePath = buildFeedbackPath()
        let data = extraxtFeedback(filePath)
        data.push(newFeedback);
        fs.writeFileSync(filePath ,JSON.stringify(data));
        res.status(201).json({message:"Success",feedback:newFeedback});
    }
    else{
        const filePath = buildFeedbackPath()
        let data = extraxtFeedback(filePath)
        res.status(200).json({feedback: data})
    }
}

export default handler