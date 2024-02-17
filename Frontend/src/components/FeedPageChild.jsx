import PropTypes from 'prop-types';
import React from 'react';
import FeedItem from './FeedItem';

const FeedPageChild = ({ data }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Latest News Feed</h2>
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
