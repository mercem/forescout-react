import React, { Component } from 'react'
import { Menu, Form } from 'semantic-ui-react'
import { withRouter} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

interface ChildComponentProps extends RouteComponentProps<any> {
  className: string;
}

class TopMenu extends Component<ChildComponentProps> {
  state = {
    activeItem: '',
    loading: false,
    postID: ''
  }

  redirectHandler = (redirectTo: string) => {
    this.props.history.push(redirectTo)
  }

  handleFormSubmit = () => {
    if(this.state.postID)
      this.redirectHandler('/posts/'+ this.state.postID);
  }

  handleInputChange = (e: any) => {
    this.setState({
      postID: e.target.value
    })
  }

  handleItemClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name });
    switch(name){
      case 'home':
        console.log('home')
        this.redirectHandler('/');
        break;
      case 'posts':
        console.log('posts')
        this.redirectHandler('/posts')
        break;
      default:
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted pointing vertical>
        <Menu.Item 
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}/>
        <Menu.Item
          name='posts'
          active={activeItem === 'posts'}
          onClick={this.handleItemClick}
        />
        <Menu.Item>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Input              
              icon='search'
              placeholder='Search by Post ID'
              value={this.state.postID}
              onChange={this.handleInputChange}
            />
            </Form>
        </Menu.Item>

      </Menu>
    )
  }
}

export default withRouter(TopMenu);