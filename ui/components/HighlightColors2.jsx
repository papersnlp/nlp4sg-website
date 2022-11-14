/* @flow */
import { findAll } from 'highlight-words-core'
import PropTypes from 'prop-types'
import { createElement } from 'react'
import memoizeOne from 'memoize-one'

HighlightColors2.propTypes = {
  activeClassName: PropTypes.string,
  activeIndex: PropTypes.number,
  activeStyle: PropTypes.object,
  autoEscape: PropTypes.bool,
  className: PropTypes.string,
  findChunks: PropTypes.func,
  highlightClassName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  highlightStyle: PropTypes.object,
  highlightTag: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  sanitize: PropTypes.func,
  searchWords: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  searchWords2: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  searchWords3: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  searchWords4: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  searchWords5: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  textToHighlight: PropTypes.string.isRequired,
  unhighlightTag: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  unhighlightClassName: PropTypes.string,
  unhighlightStyle: PropTypes.object
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <span>s (wrapping highlighted words).
 */
export default function HighlightColors2 ({
  activeClassName = '',
  activeIndex = -1,
  activeStyle,
  autoEscape,
  caseSensitive = false,
  className,
  findChunks,
  highlightClassName = '',
  highlightStyle = {},
  highlightTag = 'mark',
  sanitize,
  searchWords,
  searchWords2,
  searchWords3,
  searchWords4,
  searchWords5,
  textToHighlight,
  unhighlightTag = 'span',
  unhighlightClassName = '',
  unhighlightStyle,
  ...rest
}) {
  const chunks = findAll({
    autoEscape,
    caseSensitive,
    findChunks,
    sanitize,
    searchWords,
    textToHighlight
  })

  const HighlightTag = highlightTag
  let highlightIndex = -1
  let highlightClassNames = ''
  let highlightStyles

  const lowercaseProps = object => {
    const mapped = {}
    for (let key in object) {
      mapped[key.toLowerCase()] = object[key]
    }
    return mapped
  }
  const memoizedLowercaseProps = memoizeOne(lowercaseProps)

  return createElement('span', {
    className,
    ...rest,
    children: chunks.map((chunk, index) => {
      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)

      if (chunk.highlight) {
        highlightIndex++

        let highlightClass
        if (typeof highlightClassName === 'object') {
          if (!caseSensitive) {
            highlightClassName = memoizedLowercaseProps(highlightClassName)
            highlightClass = highlightClassName[text.toLowerCase()]
          } else {
            highlightClass = highlightClassName[text]
          }
        } else {
          highlightClass = highlightClassName
        }

        const isActive = highlightIndex === +activeIndex

        highlightClassNames = `${highlightClass} ${isActive ? activeClassName : ''}`
        highlightStyles = isActive === true && activeStyle != null
          ? Object.assign({}, highlightStyle, activeStyle)
          : highlightStyle

        /*var searchRegex  = new RegExp(searchWords.join('|'), 'g');
        var numOfMatches = text.match(searchRegex);
        if (numOfMatches){
          if (numOfMatches.length>0){
            highlightClassNames="HighlightClass2"
          }
        }*/
        //console.log(text)
        //console.log(searchWords3)
        const chunks2 = findAll({
          autoEscape,
          caseSensitive,
          findChunks,
          searchWords:searchWords2,
          textToHighlight:text
        })
        const chunks3 = findAll({
          autoEscape,
          caseSensitive,
          findChunks,
          searchWords:searchWords3,
          textToHighlight:text
        })
        const chunks4 = findAll({
          autoEscape,
          caseSensitive,
          findChunks,
          searchWords:searchWords4,
          textToHighlight:text
        })
        const chunks5 = findAll({
          autoEscape,
          caseSensitive,
          findChunks,
          searchWords:searchWords5,
          textToHighlight:text
        })

        if ((chunks2.length==-11) | (chunks2[0].highlight==true) ){
          highlightClassNames="HighlightClass2"
        } else if ((chunks3.length==-11) | (chunks3[0].highlight==true) ){
          highlightClassNames="HighlightClass3"
        } else if ((chunks4.length==-11) | (chunks4[0].highlight==true) ){
          highlightClassNames="HighlightClass4"
        } else if ((chunks5.length==-11) | (chunks5[0].highlight==true) ){
          highlightClassNames="HighlightClass5"
        }

        //var gold=0
        //var predict=0
        //if (chunks2.length>1){
        //  gold=1
        //} else if (chunks2[0].highlight==true) {
        //  gold=1
        //}
        //if (chunks3.length>1){
        //  predict=1
        //} else if (chunks3[0].highlight==true) {
        //  predict=1
        //}
//
        //if (gold==1 & predict==1){
        //  highlightClassNames="HighlightClass3"
        //}else if (gold==1){
        //  highlightClassNames="HighlightClass2"
        //}else{
        //  highlightClassNames="HighlightClass"
        //}
        

        const props = {
          children: text,
          className: highlightClassNames,
          key: index,
          style: highlightStyles
        }

        // Don't attach arbitrary props to DOM elements; this triggers React DEV warnings (https://fb.me/react-unknown-prop)
        // Only pass through the highlightIndex attribute for custom components.
        if (typeof HighlightTag !== 'string') {
          props.highlightIndex = highlightIndex
        }

        return createElement(HighlightTag, props)
      } else {
        return createElement(unhighlightTag, {
          children: text,
          className: unhighlightClassName,
          key: index,
          style: unhighlightStyle
        })
      }
    })
  })
}