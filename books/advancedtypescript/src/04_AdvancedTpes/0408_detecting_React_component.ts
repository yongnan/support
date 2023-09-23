export {}

// type isReactComponent<T> = T extends React.ComponentType<any> ? "yes" : "no";

// infer version
// type isReactComponent<T> = T extends React.ComponentType<infer P> ? "yes" : "no";

// Extracting component props type with infer
//type isReactComponent<T> = T extends React.ComponentType<infer P> ? P : "no";
type isReactComponent<T> = T extends React.ComponentType<infer P> ? P : never;

type PropsType<C> = C extends React.ComponentType<infer P> ? P : never;

class Article extends React.Component<{ content: string }> {
    render = () => this.props.content; // This would normally be some JSX
}

type ArticleProps = PropsType<typeof Article>; // { content: string; }