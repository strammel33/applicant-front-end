// css
import styles from './JobsHeader.module.css'

const JobsHeader = ({headers, sort, handleUpdateSort}) => {
  const options = {
    status: ['Interested', 'To Apply', 'Preparing Materials', 'Applied', 'Interview', 'Rejected', 'Offer'],
    priority: ['Dream Job', 'Great Option', 'Totally Fine', 'Will Pay Bills']
  }
  
  return (
    <header>
      {headers.map(header => (
        <div key={header.col} className={styles[header]}>
          {['title', 'company', 'salary'].includes(header.schemaName) ?
            <h4 
              id={header.schemaName}
              onClick={handleUpdateSort}
            >
              {header.col} {sort.schemaName === header.schemaName ? 
                sort.order > 0 ? 
                  '⌃' : '⌄'
                : ''}
            </h4>
          : ['status', 'priority'].includes(header.schemaName) ?
            <select>
              <option value="">{header.col}</option>
              {options[header.schemaName].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          :
            <h4>
              {header.col}
            </h4>
          }
        </div>
      ))}
    </header>
  )
}
 
export default JobsHeader