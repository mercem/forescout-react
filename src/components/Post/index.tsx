import React, {Component} from 'react';
import { IPost } from '../../store/types';
import { Card, Icon, Modal, Button } from 'semantic-ui-react';

interface IProps {
  post: IPost;
  deletePost: () => void;
  id: string | number;
}

class Post extends Component<IProps> {
  state = {
    open: false
  }

  onClick = () => {
    this.setState({open: true})
  }

  onClose = () => {
    this.setState({open: false})
  }

  render() {
    const {title, content, datePosted, categories} = this.props.post;
    const { open } = this.state;
    let tags = '';
    if(categories.length === 0) tags = 'This post has no tag'
    else {
      categories.forEach(c => tags += c + ', ');
      tags = tags.slice(0, -2);
    }
    return(
      <div style={{display: 'inline-block', marginRight: '1em', marginBottom:'1em'}}>
        <Card onClick={this.onClick}>
          <Card.Content header={title} />
          <Card.Content description={content.length <=40 ? content : content.substring(0, 40) + '...'} />
          <Card.Content extra>
            <Icon name='tags' />
            {tags}
          </Card.Content>
          <Card.Content extra>
            <Icon name='time' />
            {datePosted}
            <Button color='red' size='small' style={{float: 'right'}} onClick={(e) => {e.stopPropagation(); this.props.deletePost()}}>
              <Icon name= 'time' />
              Delete
            </Button>
          </Card.Content>
        </Card>
        <Modal size='tiny' open={open} onClose={this.onClose}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            <p style={{textAlign: "justify"}}> {content} </p>
          </Modal.Content>
          <Modal.Content extra>
            <div> <Icon name='tags'/> {tags}</div>
            <div> <Icon name='time'/> {datePosted}</div>
            <div style={{fontStyle:'italic', textAlign:'right'}}>ID: {this.props.id}</div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Post;



      