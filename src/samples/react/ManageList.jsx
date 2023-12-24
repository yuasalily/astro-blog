import { useState } from "react";

const ManageList = () => {
    const animals = ["Dog", "Cat", "Rabbit"];
    const [filterVal, setFilterVal] = useState("");
    const filteredAnimals = animals.filter(animal => {
        return animal.indexOf(filterVal) !== -1;
    });
    return (
        <>
            <p>リストのいろいろ</p>
            <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
            <AnimalList animals={filteredAnimals}/>
        </>
    )

}

const AnimalList = ({ animals }) => {
    if (animals.length === 0) {
        return <p>アニマルが見つかりません</p>
    }
    return (
        <ul>
            {animals.map(animal => {
                return <li key={animal}>{animal}</li>
            })}
        </ul>
    )
}

export default ManageList