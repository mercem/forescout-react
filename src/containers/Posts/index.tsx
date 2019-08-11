import React, {Component, SyntheticEvent} from 'react'; 
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import {IPost} from '../../store/types';
import {getAllPosts, deletePostByID, addPost} from '../../store/actions';
import Post from '../../components/Post';
import { Loader, Modal, Button, Header, Icon, Form, DropdownProps, Dropdown } from 'semantic-ui-react';

interface IProps {
  posts: IPost[];
  getAllPosts: () => any;
  deletePostByID: (id: number) => any;
  addPost: (post: IPost) => any;
  isLoading: boolean;
}

const tagsOptions = [
  {text: 'Car', value: 'car'},
  {text: 'Truck', value: 'truck'},
  {text: 'Sport', value: 'sport'},
  {text: 'Family', value: 'family'},
  {text: 'Mini', value: 'mini'},
  {text: 'Large', value: 'large'}                    
];

class PostsContainer extends Component<IProps> {
  state={
    open: false,
    tags: [],
    title: '',
    content: '',
    titleError: false,
    contentError: false,
    tagsError: false,
    filters: []
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  deletePost = (id: number): void => {
    this.props.deletePostByID(id);
  }

  openModal = (open: boolean): void =>{
    this.setState({open})
  }

  onDropdownChange = (event: SyntheticEvent, data: DropdownProps) => {
    this.setState({
      [data.id]: data.value
    })
  }

  onInputChange = (event: SyntheticEvent, data: any) => {
    this.setState({
      [data.id]: data.value
    })
  }

  onSubmit = (event: any, data: any) => {
    let error = false;
    let titleError, contentError, tagsError;
    titleError = contentError = tagsError = false;

    const { tags, title, content} = this.state;
    if(title === '') {titleError = true; error= true};
    if(tags.length === 0) {tagsError = true; error= true};
    if(content === '') {contentError = true; error= true};
    this.setState({titleError, tagsError, contentError});
    if(error) return;
    this.props.addPost({title, categories: tags, content, datePosted: new Date().toDateString()}).then(this.setState({open:false}))
  }

  filterPosts = (): (IPost | null)[]  => {
    const { posts } = this.props;
    const { filters } = this.state;
    if(filters.length === 0) return posts;
    let filteredPosts= posts.map(post => {
      for(let i=0; i<filters.length; i++) {
        if(post.categories.includes(filters[i])) {
          return post;
        }
      } return null;
    })
    return filteredPosts;
  }

  render(){
    const { posts, isLoading } = this.props;
    const { open, tags, title, content, titleError, contentError, tagsError, filters } = this.state;

    if(isLoading) return (<Loader inverted active inline='centered' />)
    if(posts.every(post => !post)) return `You have no post`
    let filteredPosts = this.filterPosts();
    if(filteredPosts.length===0) return `No matching post for the selected tags`
    return(
      <div>
        <div style={{marginBottom: '1em', display:'flex', alignItems:'center'}}>
          <Modal open={open} size='small' style={{display:'inline-block'}} 
              trigger= {<Button color='blue'> <Icon name='write'/> New Post </Button>} 
              onOpen={() => this.openModal(true)} 
              onClose={() => this.openModal(false)}>
            <Header icon='archive' content='Archive Old Messages' />
            <Modal.Content>
              <Form onSubmit={this.onSubmit}>
                <Form.Group widths='equal'>
                  <Form.Input error={titleError}
                    id='title'
                    label='Title'
                    placeholder='Title'
                    value={title}
                    onChange={this.onInputChange}
                    required
                  />
                  <Form.Dropdown
                    id='tags'
                    label='Tags'
                    multiple
                    selection
                    placeholder='Tags'
                    options={tagsOptions}
                    value = {tags}
                    onChange = {this.onDropdownChange}
                    required
                    error={tagsError}
                  />
                </Form.Group>
                <Form.TextArea
                    id='content'
                    label='Content'
                    placeholder='Content'
                    value={content}
                    onChange={this.onInputChange}
                    required
                    error={contentError}
                  />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted onClick={this.onSubmit}>
                <Icon name='checkmark' /> Post
              </Button>
            </Modal.Actions>
          </Modal>
          <Dropdown style={{display:'inline-block', width:'200px', marginLeft: '1em'}}
            id='filters'
            placeholder='Filter by tags'
            fluid
            multiple
            selection
            value={filters}
            onChange = {this.onDropdownChange}
            options={tagsOptions}   
          /> 
        </div>  
        {filteredPosts.map((post, id) => {
            if(post) return <Post key={id} id={id} post={post} deletePost={() => this.deletePost(id)}/>
            return null;
        })}
      </div>
    )
  }
}


const mapStateToProps = (state: any) => ({
    posts: state.posts.posts,
    isLoading: state.loading.GET_ALL_POSTS
})


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getAllPosts: () => dispatch(getAllPosts()),
    deletePostByID: (id: number) => dispatch(deletePostByID(id)),
    addPost: (post: IPost) => dispatch(addPost(post))

})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
