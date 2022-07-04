import React, { Component } from 'react';
import { useState, useEffect } from "react";
import papers from 'public/papers_goals.json';
import Highlighter from "react-highlight-words";
// get posts from online api
// it's return a json file
//class GetPapers extends Component {
//    constructor(props){
//        super(props);
//        this.state = {            
//            posts :posts            
//        };
//    }
const GetPapers = ({ goal }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        
            setData(papers.filter((a) => a.Goal ==goal ));
        
      }, [goal]);
        //const {posts} = this.state;
        return(
            <div>
                <ol className="item">
                {
                    data.map(post => (
                        <li key={post.url} align="start">
                            <div>
                                <Highlighter
                                    className="title"
                                    highlightClassName="YourHighlightClass"
                                    searchWords={post.Task.concat(post.Method)}
                                    autoEscape={true}
                                    textToHighlight={post.title}
                                />
                 
                                <p className="body">TASK: 
                                {post.Task.map((child, i) => (
                                 <text> {child},,</text> 
                                ))} </p>

                                <Highlighter
                                    className="body"
                                    highlightClassName="YourHighlightTask"
                                    searchWords={post.Task}
                                    autoEscape={true}
                                    textToHighlight={post.abstract}
                                />

                                <p className="body">METHOD: 
                                {post.Method.map((child, i) => (
                                 <text> {child},,</text> 
                                ))} </p>

                                <Highlighter
                                    className="body"
                                    highlightClassName="YourHighlightMethod"
                                    searchWords={post.Method}
                                    autoEscape={true}
                                    textToHighlight={post.abstract}
                                />

                            </div>
                        </li>
                    ))
                }
                </ol>
            </div>
        );
  };
  
  export default GetPapers;