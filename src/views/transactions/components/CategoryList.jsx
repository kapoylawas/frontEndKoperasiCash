import { useHorizontalScroll } from '../../../utils/useHorizontalScroll';

export default function CategoryList({ categories, fetchProducts, fetchProductByCategoryID, setCurrentCategoryId, currentCategoryId }) {
  const { scrollRef, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useHorizontalScroll();

  return (
    <div className='row'>
      <div className='col-md-2'>
        <a href='#' className='text-decoration-none' onClick={() => {
          fetchProducts();
          setCurrentCategoryId(null); // Set currentCategoryId to null for "All"
        }}>
          <div className={`card card-link card-link-pop mt-3 rounded ${currentCategoryId === null ? 'active' : ''}`}
            style={{
              border: currentCategoryId === null ? '2px solid #007bff' : 'none',
              backgroundColor: currentCategoryId === null ? 'rgba(0, 123, 255, 0.1)' : ''
            }}>
            <div className="card-body d-flex align-items-center justify-content-center p-2">
              <img
                src="/images/categories.png"
                alt=""
                width={50}
                height={60}
                className="me-2 p-2"
              />
              <h4 className="mb-0 mt-2">All</h4>
            </div>
          </div>
        </a>
      </div>
      <div className='col-md-10'>
        <div className="horizontal-scroll" ref={scrollRef} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          <div className="row mt-3">
            {
              categories.map(category => (
                <div className='col-4' key={category.id}>
                  <a href='#' className='text-decoration-none' onClick={() => {
                    fetchProductByCategoryID(category.id);
                    setCurrentCategoryId(category.id);
                  }}>
                    <div className={`card card-link card-link-pop rounded ${currentCategoryId === category.id ? 'active' : ''}`}
                      style={{
                        border: currentCategoryId === category.id ? '2px solid #007bff' : 'none',
                        backgroundColor: currentCategoryId === category.id ? 'rgba(0, 123, 255, 0.1)' : ''
                      }}>
                      <div className="card-body d-flex align-items-center justify-content-center p-2">
                        <img
                          src={`${import.meta.env.VITE_APP_BASEURL}/${category.image}`}
                          alt={category.name}
                          width={100}
                          height={60}
                          className="me-2"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
