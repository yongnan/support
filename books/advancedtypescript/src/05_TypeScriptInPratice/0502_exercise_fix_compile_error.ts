interface MyEvent {
    target: {
        id?: string;
    }
}

interface Props {
    width: number;
    height: number;
    callbacks: {
        onSuccess: (event: MyEvent) => void;
    };
}

const component: (props: Props) => string = (props) =>
    `<div width="${props.width}"></div>`;

const props = { 
    width: 100,
    height: 200,
    callbacks: {
        onSuccess: (event: { target: { id?: string } }) => {
            console.log(event.target.id);
       },
    },
}

component(props);