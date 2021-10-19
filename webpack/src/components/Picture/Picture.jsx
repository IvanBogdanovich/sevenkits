import React, { useState } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

function Picture({ alt, sources, image, ...rest }) {
    const [error, setError] = useState(false)

    const srcSet = collection => {
        const commonPath = []

        for (const prop in collection) {
            const isHasOwnProperty = collection.hasOwnProperty(prop)

            if (isHasOwnProperty) {
                commonPath.push(`${collection[prop]} ${prop}`)
            }
        }

        return commonPath.join(', ')
    }

    const handleError = () => setError(true)
    if (error) return null

    return (
        <picture {...rest}>
            {sources?.map(source => (
                <source
                    srcSet={srcSet(source.srcset)}
                    media={source.media}
                    key={shortid.generate()}
                />
            ))}
            <img
                src={image.src}
                srcSet={image.srcset ? srcSet(image.srcset) : null}
                alt={alt}
                onError={handleError}
            />
        </picture>
    )
}

Picture.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string,
        srcset: PropTypes.objectOf(PropTypes.string)
    }).isRequired,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            srcset: PropTypes.objectOf(PropTypes.string),
            media: PropTypes.string
        })
    ),
    alt: PropTypes.string
}

Picture.defaultProps = {
    sources: null,
    alt: null
}

export default Picture
