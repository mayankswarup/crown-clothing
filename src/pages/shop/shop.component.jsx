import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  
  state = {
    isLoading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const { updateCollections }= this.props;
      const collectionRef = firestore.collection('collections');

      collectionRef.get().then(snapshot => {
        console.log(snapshot);
        const collectionMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionMap);
        console.log(collectionMap);
        this.setState({isLoading: false});

       
      });

      // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      //   console.log(snapshot);
      //   const collectionMap = convertCollectionSnapshotToMap(snapshot);
      //   updateCollections(collectionMap);
      //   console.log(collectionMap);
      //   this.setState({isLoading: false});

       
      // });
  }


  render(){
    const {match}= this.props;
    const {isLoading} = this.state;
    return(
      <div className='shop-page'>
          <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />} />
          <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={isLoading} {...props} />} />
      </div>
    );
  }
      
}

const mapDispatchToProps = dispatch =>( {
  updateCollections: (collectionMap) => dispatch(updateCollections(collectionMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);
