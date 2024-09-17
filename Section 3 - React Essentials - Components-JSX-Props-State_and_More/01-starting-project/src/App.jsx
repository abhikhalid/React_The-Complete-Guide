import { CORE_CONCEPTS } from './data.js';
import CoreConcept from './components/CoreConcept.jsx';
import Header from './components/Header/Header.jsx';
import TabButton from './components/TabButton.jsx';

function App() {

  function handleSelect(selectedButton) {
    console.log(selectedButton);
  }


  return (
    <div>
      <Header/>
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept
              {
               ...CORE_CONCEPTS[1] 
              }
            />
            <CoreConcept
              {
                ...CORE_CONCEPTS[2]
              }
            />
            <CoreConcept
              {
                ...CORE_CONCEPTS[3]
              }
            />
          </ul>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              onClick={() => handleSelect('components')}>
              Components 
            </TabButton>
            <TabButton onClick={() => handleSelect('jsx')}>
              JSX 
            </TabButton>
            <TabButton onClick={() => handleSelect('props')}>
              Props 
            </TabButton>
            <TabButton onClick={() => handleSelect('state')}>
              State 
            </TabButton>
          </menu>
              Dynamic Content
        </section>
      </main>
    </div>
  );
}

export default App;
