import PropTypes from 'prop-types';
import React from 'react';
import FeedItem from './FeedItem';

const FeedPageChild = ({ data }) => {
    return (
        <div>
            {data.map((news, index) => (
                //console.log(news.link)
                <FeedItem key={index} data={news} />
            ))}
        </div>
    );
};

FeedPageChild.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeedPageChild;
