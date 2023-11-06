import { FileUploader } from 'common';

function App() {

  return (
    <main className='lg:w-[1200px] px-4 md:w-[540px] mx-auto pt-16'>
      <section className='flex flex-col p-12 bg-white rounded-md shadow-md gap-7'>
        <h1 className='text-xl font-bold text-center'>Id Upload with Tessaract OCR</h1>
        <div>
          <FileUploader />
        </div>
      </section>
    </main>
  );

}

export default App;
