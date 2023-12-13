import { get_item } from "../../Logic/storage.js";

export default function handle_submit() {
  const all_questions = get_item('data_question', 'local') //? all câu hỏi
  const list_answer = get_item('list_answer', 'session') //? danh sách câu trả lơi
  const this_exam = get_item('this_exam', 'session') // ? danh sách cau hỏi của bài kiểm tra
  const quantity_answer = list_answer.length //? số câu trả lời
  const quantity_question = this_exam.length // ? số câu hỏi
  const point = 10 / quantity_question // ? điểm của mỗi câu
  let total_point = 0;
  for (let index = 0; index < quantity_answer; index++) { 
    const this_question = list_answer[index] // ? câu hỏi thứ index
    const this_answer = this_question[1] // ? đáp án của câu hỏi thứ index
    const id_this_question = this_question[0] // ? id của câu hỏi thứ index
    const info_this_question = all_questions.filter(question => question[0].stt === id_this_question) // ? thông tin của câu hỏi thứ index
    let quantity_correct=0;
    const correct_answer = info_this_question[0][1].filter(answer => answer.isTrue == true)
    const quantity_correct_answer = correct_answer.length
    for (let i = 0; i < this_answer.length; i++) { 
      const isCorrect = info_this_question[0][1].filter(answer => answer.answer == this_answer[i])
      if (isCorrect[0]) { 
        if (isCorrect[0].isTrue) quantity_correct++;
      }
    }
    if (quantity_correct == quantity_correct_answer) total_point += point
  }
  return total_point;
}