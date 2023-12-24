import { useState } from "react";

const UpdateState = () => {
    const [dog, setDog] = useState({ name: "Jhon", age: 9 });
    const updateName = (e) => {
        setDog(prev => ({ ...dog, name: e.target.value }));
    };
    const updateAge = (e) => {
        setDog(prev => ({ ...dog, age: e.target.value }));
    };
    return (
        <>
            <p>注意点:stateはレンダリングされるまで更新されない。オブジェクトを更新する場合は新しいオブジェクトをセットしなければならない</p>
            <p>name: {dog.name}</p>
            <p>age: {dog.age}</p>
            <input type="text" onChange={updateName} value={dog.name} />
            <input type="number" onChange={updateAge} value={dog.age} />
        </>
    )
};

export default UpdateState