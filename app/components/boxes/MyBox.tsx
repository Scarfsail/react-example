import * as React from "react";

interface DeviceRowProps {
    title: string;
    borderWidth: number;
};


export function MyBox(p: DeviceRowProps) {
    const [counter, setCounter] = React.useState(0);

    return <div style={{ borderWidth: p.borderWidth, borderColor: "black", borderStyle: "solid", margin: 5 }}>
        <span style={{ marginRight: 5 }}>{p.title}</span>
        <span style={{ marginRight: 5 }}>{counter}</span>

        <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </div>

}
