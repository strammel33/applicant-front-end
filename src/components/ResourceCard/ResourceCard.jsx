
//css
import styles from './ResourceCard.module.css'

const ResourceCard = ({setSelectedResource, selectedResource, resource, setEditedResource, handleDeleteResource, profile, setProfile, handleAddStarredResource, user, handleRemoveStarredResource}) => {

  const selected = selectedResource && selectedResource._id === resource._id 

  const alreadyStarred = profile.starredResources?.some(r => r === resource._id)

  const handleSelect = () => {
    if (selected) {
      setSelectedResource(null)
    }
    else {
      setSelectedResource(resource)
    }
  }

  const handleChangeToEditResource = () => {
    setEditedResource(resource)
    setSelectedResource(null)
  }

  const handleStarredResourceClick = () => {
    if (alreadyStarred) {
      handleRemoveStarredResource(user, resource)
      setProfile({...profile, starredResources: profile.starredResources.filter(r => r !== resource._id)})
    } else {
      handleAddStarredResource(user, resource)
      setProfile({...profile, starredResources: [...profile.starredResources, resource]})
    }
  }


  return (  
    <>
      <div className={
        `${styles.resource} 
        ${selected? styles.selected : ''}`
        }>
        <span>
          <p
          onClick={() => handleSelect()}
          >
            {selected ? '⬆️' : '⬇️' }</p>
        </span>
        <div className='updated-at'>
          <p>{new Date(resource.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.name}>
          <p>{resource.name}</p>
        </div>
        <div className={styles.category}>
          <p>{resource.category}</p>
        </div>
        <div className={styles.rating}>
          <p>{resource.averageRating?.toFixed(1)}</p>
        </div>
        <div className={styles.link}>
          <p>{resource.link}</p>
        </div>
          {(profile._id === resource.owner || profile?.role > 200) &&
            <>
              <span
                onClick={() => handleChangeToEditResource()}
              >✎</span>
              <span
                onClick={() => handleDeleteResource(resource)}
              >🗑️</span>
            </>
          }
          <span
            onClick={() => handleStarredResourceClick()}
          >
            {alreadyStarred ? '★' : '☆' }
          </span>
      </div>
      {selected && 
        <div className={styles.details}>
          <div className={styles.instructions}>
            <div>
              Instructions: 
            </div>
            <div>
              {resource.instructions}
            </div>
          </div>
          <div>
            {resource.reviews.length} Reviews
          </div>
        </div>
      }
    </>
  )
}

export default ResourceCard