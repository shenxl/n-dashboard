import React, { Component, PropTypes } from 'react';
import { Tag  } from 'antd';

import styles from './panel.less';

var _ = require('lodash');

const SearchTags = ({ searchInfo  }) => {

  const buildTags = () => {
    const result =  _.map(searchInfo, ( item ,index ) => {
      switch (item.key) {
        case 'address':
          return ( <Tag key={index}  color="#2db7f5"> {item.value} </Tag> )
          break;
        case 'type':
          return ( <Tag key={index}  color="#87d068"> {item.value} </Tag> )
          break;
        case 'keyword':
          return ( <Tag key={index}  color="#f50"> {item.value} </Tag> )
          break;
        case 'important':
            return ( <Tag key={index}  color="#f50"> 重点用户 </Tag> )
            break;
        default:
      }
    });
    return result;
  }

  return (
    <div className={styles.tagsMargin}>
      { buildTags() }
    </div>
  );
};

SearchTags.propTypes = {
  searchInfo : PropTypes.array.isRequired
};

export default SearchTags;
