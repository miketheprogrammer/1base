import * as Rx from 'rxjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../components/ItemList';
import ItemCreate from '../components/ItemCreate';
import ItemInfo from '../components/ItemInfo';
import * as ItemActions from '../actions/ItemActions';
import './CounterApp.css';
import logo from '../logo.svg';
import {
  Button,
  TextField,
  TextFieldIcon,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme
} from 'rmwc';

class Items extends Component {
  constructor(props){
    super(props);
    this.setState({});
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(ItemActions.fetchItems({game: this.props.game_id}));
  }
  componentWillUnmount() {
  }

  createItem(values) {
    console.log('creating GAMEwith ', values, this.props);
    values.organization = this.props.organization_id;
    this.props.dispatch(ItemActions.saveNewItem(values));
  }

  search(searchFilter) {
    const {dispatch} = this.props;
    dispatch(ItemActions.searchItems(searchFilter))
  }

  renderToolbar(title, useSearchWidget) {
    const {searchFilter, dispatch} = this.props;
    let search;
    if (useSearchWidget) {
        search = (
          <TextField withLeadingIcon={<TextFieldIcon use="search"/>}  label="search" onChange={(e) => this.search(e.target.value)} value={searchFilter}/>
        )
    }
    return (
      <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
          {search}
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderItemList() {
    const { items, dispatch } = this.props;
    return (
      <ItemList
        items={items}
        onSelected={(_id) => {
          dispatch(ItemActions.selectItem(_id))
        }}
        onCreateNew={() => {
          dispatch(ItemActions.createNewItem())
        }}
        />
    )
  }

  renderViewItem(){
    const {items, dispatch, selected}=this.props;
    const item = items.filter((item)=> item._id===selected)[0]
    if (!item) {
      return (<div>Player is missing for some reason from the data</div>)
    }
    return (
      <ItemInfo
        item={item}/>
    )
  }


  renderCreateNewItem() {
    const { organizations, dispatch } = this.props;
    return (
      <ItemCreate
        onCreate={(values) => this.createItem(values)}
        onCancel={() => {dispatch(ItemActions.cancelCreateNewItem())}}
      />
    )
  }
  render() {
    const { selected, items, creating, dispatch } = this.props;
    let toolbar, content;
    console.log('ITEM RENDER', creating, selected)
    if (!creating) {
      if(selected){
        toolbar= this.renderToolbar(`Item: ${selected}`)
        content = this.renderViewItem();
      } else {
        toolbar = this.renderToolbar("View and Manage your Items", true);
        content = this.renderItemList();
      }
    } else {
      toolbar = this.renderToolbar("Create A New Item");
      content = this.renderCreateNewItem()
    }
    return (
      <main style={{marginTop: "12px"}}>
        {toolbar}
        {content}
      </main>
    )

  }

}
export default connect(state => ({
  items: state.item.items || [],
  organization_id: state.organization.selected,
  game_id: state.item.selected,
  creating: Boolean(state.item.creating),
  searchFilter: state.item.searchFilter,
  selected: state.item.selected,
}))(Items);
