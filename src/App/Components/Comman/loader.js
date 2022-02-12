import LoadingOverlay from 'react-loading-overlay'
 
export default function MyLoader({ active, children }) {
  return (
    <LoadingOverlay
    active={active}
    spinner
    text='Loading...'
    >
    {children}
  </LoadingOverlay>
  )
}