import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const FeedItem = ({ data }) => {
    return (
        <div className="border rounded p-4 mb-4 bg-white shadow-md">
            {/* Image */}
            {data.imageUrl && (
                <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="mb-2 rounded-md max-w-full"
                />
            )}

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">{data.title}</h3>

            {/* Description */}
            <div
                className="text-gray-700 mb-2"
                dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* Read More Link */}
            <Link
                to={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                Read More
            </Link>
        </div>
    );
};

FeedItem.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        imageUrl: PropTypes.string, // Add imageUrl to the propTypes
    }).isRequired,
};

export default FeedItem;
