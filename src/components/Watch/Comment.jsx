import React, {useState} from 'react'
import imgNull from '../../assets/images/user-none.png'
const Comment = props => {
    
    const [comment, setComment] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('.comment-input')
        const value = input.value;

        if(!value && value.length === 0) return;

        const ramdomId = Math.floor(Math.random() * 1000000)
        let obj = {}
        obj.img = imgNull
        obj.name = "Someone"
        obj.comment = value
        obj.id = ramdomId

        const temp = [...comment]
        temp.push(obj)
        setComment(temp)

        input.value = ""
    }

    const handleDelete = (value) => {
        const temp = [...comment]
        setComment(temp.filter(item => item.id !== value))
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="comment-form">
                <input type="text" className="comment-input" placeholder="Nhập bình luận phim"/>
                <button type="submit">Gửi</button>
            </form>

            <div className="comment-list">
                {
                    comment.map((item, index) => (
                        <div key={index} className="comment-item">
                            <div className="comment-left">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="comment-right">
                                <div className="comment-name">{item.name}</div>
                                <div className="comment-desc">{item.comment}</div>
                            </div>
                            <div onClick={() => handleDelete(item.id)} className="btn-delete">Xóa</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default Comment
