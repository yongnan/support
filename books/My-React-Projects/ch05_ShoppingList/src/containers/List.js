import React from 'react';
import styled from 'styled-components';
import { ListsContext } from '../context/ListsContextProvider';
import { ItemsContext } from '../context/ItemsContextProvider';
import SubHeader from '../components/Header/SubHeader';
import ListItem from '../components/ListItem/ListItem';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const List = ({match, history }) => {
    const { list, getListRequest } = React.useContext(ListsContext);
    const { loading, error, items, getItemsRequest } = React.useContext(ItemsContext);
    //const [prevItems, setItems] = React.useState('');
    React.useEffect(() => {
        if (!list.id) {
            getListRequest(match.params.id);
        }
      //if (!items.length) {
      //if (prevItems.length === items.length){
          getItemsRequest(match.params.id);
          //setItems(items)
      //};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //[ items, match.params.id, getItemsRequest]);

    return !loading && !error ? (
        <>
          {history && list &&
            <SubHeader
              goBack={() => history.goBack()}
              openForm={() => history.push(`${match.url}/new`)}
              title = {list.title}
            />
          }
          <ListItemWrapper>
            {items && items.map(item => <ListItem key={item.id} data={item} />)}
          </ListItemWrapper>
        </>
    ) : (
       <Alert>{loading ? 'Loading...' : error}</Alert>
    );
};

export default List;
