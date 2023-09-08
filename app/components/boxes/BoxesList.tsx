import * as React from "react";
import { MyBox } from "./MyBox";

export function BoxesList() {
    const [myString, setMyString] = React.useState<string>("No title has been added");

    const [titles, setTitles] = React.useState(["box1", "box2", "box3"]);

    function addNewBox() {
        const title = prompt("Enter title of the new box:", "My fancy box");
        setTitles([...titles, title]);
        setMyString("A title has been added")
    }

    return (
        <div>
            Boxes:
            {myString}
            {titles.map((title, index) => <MyBox title={title} borderWidth={index} />)}
            <div style={{ marginTop: 16 }}>
                <button onClick={addNewBox}>Add new box</button>
            </div>
        </div>
    )
}
