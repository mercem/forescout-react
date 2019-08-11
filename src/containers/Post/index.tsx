import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import {IPost} from '../../store/types';
import {getPostByID, deletePostByID} from '../../store/actions';
import { Loader} from 'semantic-ui-react'
import Post from '../../components/Post';

interface IProps {
  posts: IPost[];
  isLoading: boolean;
  getPostByID: (id: number) => any;
  deletePostByID: (id: number) => any;
  match: any;
}

class PostContainer extends Component<IProps> {
  state = {
    id: this.props.match.params.id
  }
  componentDidUpdate(prevProps: IProps) {
    const {id} = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.getPostByID(id);
      this.setState({id});
    }
  }

  componentDidMount() {
    this.props.getPostByID(this.props.match.params.id);
  }

  deletePost = (id: number) => {
    this.props.deletePostByID(id);
  }

  render(){
    const { posts, isLoading } = this.props;
    const {id} = this.state
    const post = posts[id];

    if(isLoading)
      return (<Loader inverted active inline='centered' />)
      
    if(!post) return `Post with ID: ${id} is not found.`

    return(
      <div>
       <Post id={id}  post={post} deletePost={() => this.deletePost(id)}/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
    posts: state.posts.posts,
    isLoading: state.loading.GET_POST_BY_ID
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getPostByID: (id: number) => dispatch(getPostByID(id)),
  deletePostByID: (id: number) => dispatch(deletePostByID(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
