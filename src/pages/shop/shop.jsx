import React from 'react';
import ShopData from './shop.data.js'
import CollectionPreview from '../../components/collection-preview/collections-preview'

class ShopPage extends React.Component {
    constructor(){
        super();
        this.state = {
            collections: ShopData
        }
    }

    render(){
    const { collections } = this.state;
    return (<div className='shop-page'>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>)
    }
}
export default ShopPage;