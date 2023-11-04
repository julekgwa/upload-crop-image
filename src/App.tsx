import { FileUploader } from 'common';

function App() {

  return (
    <main className='lg:w-[1200px] px-4 md:w-[540px] mx-auto pt-16'>
      <section className='bg-white flex flex-col gap-7 rounded-md p-12 shadow-md'>
        <h1 className='text-xl font-bold text-center'>Id Upload</h1>
        <div>
          <FileUploader />
        </div>
      </section>
    </main>
  );

}

export default App;
