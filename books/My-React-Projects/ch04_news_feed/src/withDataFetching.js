import React from 'react';

export default function withDataFetching(WrappedComponent) {
    //return class extends React.Component {
    class WithDataFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: '',
            };
            //WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;
            WithDataFetching.displayName = `WithDataFetching(${this.props.name})`;
        }
        async componentDidMount() {
            try {
                 const data = await fetch(this.props.dataSource);
                 const dataJSON = await data.json();

                 if (dataJSON) {
                       this.setState({
                             data: dataJSON,
                             loading: false,
                           });
                     }
           } catch(error) {
                 this.setState({
                       loading: false,
                       error: error.message,
                     });
           }
        }
        render() {
            const { data, loading, error } = this.state;

            return (
               <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
               />
            );
        }
    }
    return WithDataFetching;
}
