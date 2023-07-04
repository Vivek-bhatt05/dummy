import { buildFeedbackPath, extraxtFeedback } from "./feedback";

function handler(req,res){
    const feedbackId = req.query.feedbackId;

    const filePath = buildFeedbackPath();
    const feedbackData = extraxtFeedback(filePath)

    const singleFeedback=feedbackData.find((feed)=>feed.id===feedbackId);

    res.status(200).json({feedbakc:singleFeedback})
}

export default handler