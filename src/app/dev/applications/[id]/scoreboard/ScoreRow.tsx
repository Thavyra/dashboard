import Score from "@/models/Score";

export default function ScoreRow({score}: {score: Score}) {
    return (
        <tr>
            <td>{score.user_id}</td>
            <td>{score.score}</td>
            <td>{score.created_at.toDateString()}</td>
        </tr>
    )
}