import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';


import {Button, Modal, ModalBody, ModalHeader, Row, Label} from 'reactstrap';

import {Control, LocalForm, Errors} from 'react-redux-form';
import Loading from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

   

    function RenderDish({dish})
    {
        return(                
            <div className="col-12 col-md-4 m-1">
                <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>           
                        </CardBody>        
                    </Card> 
                </FadeTransform>
            </div>
        );     
    }  


    function RenderComments({comments, postComment, dishId})
    {
        if(comments != null)
        {
            return (
              <div className="col-12 col-md-5 m-1">
                  <h4>Comments</h4>
                    <ul  className="list-unstyled">
                        <Stagger in>
                        {comments.map((comment) => {
                            return(
                                    <Fade in>
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {comment.date}</p>
                                        </li>     
                                    </Fade>            
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )                            
                          
        }
        else
        {
            return(
                <div></div>
            );
        }
    }
    
    const DishDetail = (props)=>
    {
        if(props.isLoading)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess)
        {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null)
        {           
            return(
                <div className='container'>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />  
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            isModalOpen: false,
        }

        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values)
    {
        this.handleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render()
    {
        return(
            <div>
                <Button outline onClick={this.handleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleModal}>
                    <ModalHeader toggle={this.handleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className='container' onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label>Rating</Label>
                                <Control.select className="form-control" model=".rating" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>                                    
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label>Your Name</Label>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Row>
                            <Row className="form-group">
                                <Label>Comment</Label>
                                <Control.textarea className="form-control" model=".message" name="message" rows="6"/>                                    
                            </Row>
                            <Row className="form-group">
                                <Button type='submit' color="primary">Submit</Button>                                 
                            </Row>
                            
                            

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default DishDetail;  