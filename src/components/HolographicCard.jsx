import { useEffect, useRef, useState } from 'react';
import './HolographicCard.css';

const INITIAL_CARD_DECKS = {
  activist: {
    green: [
      { id: 'ag1', heading: "Clean Transportation Initiative", text: "You advocated for clean, and electric public transportation that is making people more aware about clean transport.", action: "Jump to the next green spot" },
      { id: 'ag2', heading: "Climate Change Research Fundraiser", text: "Congratulations on hosting a fundraiser to support climate change research that is a great kickstart!", action: "Take one step ahead" },
      { id: 'ag3', heading: "Environmental Education Program", text: "You connected stakeholders and helped set up an educational program to teach sustainability in villages.", action: "You and the citizen both take one step ahead" },
      { id: 'ag4', heading: "Community Solar Panel Initiative", text: "You helped install solar panels in low-income communities. What a commendable action!", action: "You get to have one more chance" },
      { id: 'ag5', heading: "Focus on Marginalised Communities", text: "Your collaboration with tech companies ensured that early warning systems are made for all, including PwDs, women, and local communities and tribes.", action: "You both get to take two steps ahead each" },
      { id: 'ag6', heading: "Sustainable Agriculture Advocacy", text: "You met farmers, the backbone of the country, and advocated for sustainable, and regenerative agriculture.", action: "Skip the next red space" },
      { id: 'ag7', heading: "Divest from Fossil Fuels", text: "You led a campaign in your city to divest from fossil fuel-based companies that are forcing them to go green.", action: "Skip the next red spot" },
      { id: 'ag8', heading: "Start a Climate NGO", text: "So happy to see that you started a non-profit focused on climate change advocacy.", action: "You both get to take one step each" },
      { id: 'ag9', heading: "Sustainability in Business", text: "Wow! You convinced a major corporation to adopt sustainable practices.", action: "Take 2 steps ahead" },
      { id: 'ag10', heading: "National-Level Climate Protest", text: "You mobilized hundreds of people to march for climate action, raising awareness about the sensitivity of the issue.", action: "Skip two red spots" },
      { id: 'ag11', heading: "International Recognition", text: "Your efforts to mitigate climate change in different sectors are getting recognized. You have become a climate superhero in your country.", action: "Draw a Good Karma card" }
    ],
    red: [
      { id: 'ar1', heading: "Public Apathy", text: "The careless citizens show little interest in your climate campaign, and you feel isolated and discouraged and it stalls your efforts.", action: "You both take one step back" },
      { id: 'ar2', heading: "Vandalism on Green Project Sites", text: "Your renewable energy projects are sabotaged by anti-environmental citizens that are vandalising the property.", action: "Both players interchange spaces (only if you are ahead in the game)" },
      { id: 'ar3', heading: "Climate Change Denial Campaign", text: "A disinformation campaign is launched by some citizens to undermine your efforts and sow doubt in the public about climate science.", action: "Both players step back 1 space" },
      { id: 'ar4', heading: "Community Opposition", text: "You failed to make local communities understand the concept of climate change and now they resist your sustainable initiatives.", action: "Draw a Bad Karma card!" },
      { id: 'ar5', heading: "Funding Shortage", text: "You struggle to secure enough funds for your environmental initiatives, slowing your progress.", action: "Move back 1 space" },
      { id: 'ar6', heading: "Legal Battles", text: "Your climate advocacy group faces legal battles from corporations trying to block your work.", action: "Go back 2 spaces" },
      { id: 'ar7', heading: "Media Blackout", text: "Major media outlets refuse to cover your climate campaign, making it harder to spread your message.", action: "Draw one more red card" },
      { id: 'ar8', heading: "Failed Green Initiative", text: "Your windmill installation project introduced in a local community fails due to unforeseen technical or financial issues.", action: "Go to the previous red spot" },
      { id: 'ar9', heading: "Regressive Government Policy", text: "The government introduces policies that roll back environmental protections, making your work harder. Your campaigns are failing.", action: "Go back to the previous red spot" }
    ]
  },
  citizen: {
    green: [
      { id: 'cg1', heading: "Carpooling", text: "You start carpooling to reduce your carbon footprint that is leading to a more sustainable future.", action: "Move to the next green spot!" },
      { id: 'cg2', heading: "Carbon-Neutrality", text: "You said no to single use plastic, paper-cups, cutlery, tissues, and you are now organizing tree plantation drives in your city.", action: "Skip the next 1 red spot" },
      { id: 'cg3', heading: "Energy-Efficient Appliances", text: "You replace old appliances with energy-efficient ones in your home by taking advise from the activist.", action: "You and the activist take one step ahead" },
      { id: 'cg4', heading: "At-Home Composting", text: "It's great to see that you started composting food waste to reduce landfill emissions.", action: "Take one more chance" },
      { id: 'cg5', heading: "Sustainable Shopping Habits", text: "You have now become thoughtful and you switch to buying sustainable, eco-friendly products.", action: "Jump to the next green spot" },
      { id: 'cg6', heading: "Plant a Home-Garden", text: "You plant a garden to grow your own vegetables and support local Biodiversity. What a superb idea!", action: "Move ahead 2 spaces" },
      { id: 'cg7', heading: "Join an Environmental Group", text: "You join a community group dedicated to environmental advocacy and action on climate change!", action: "Go to the next green spot" },
      { id: 'cg8', heading: "Reducing Water Usage", text: "You install water meters at your home to reduce consumption at home.", action: "Move ahead 1 space!" },
      { id: 'cg9', heading: "Switching to Renewable Energy", text: "You now choose to power your home by switching to renewables like solar and wind by taking advice from activist.", action: "You both get to take 1 step ahead each" },
      { id: 'cg10', heading: "Organizing a Clean-Up Event", text: "You organized a local clean-up event to remove waste from a nearby park or beach with the help of activist.", action: "Skip the next red spot" },
      { id: 'cg11', heading: "Advocacy for climate-friendly technologies", text: "We are so impressed to see that you started to talk about the benefits of climate-friendly tech in your peer circle.", action: "Draw a good karma card!" }
    ],
    red: [
      { id: 'cr1', heading: "Carbon Emissions from Driving", text: "You frequently drive long distances, increasing your carbon footprint sabotaging the initiatives by the climate activist.", action: "Move back 2 spaces" },
      { id: 'cr2', heading: "Excessive Plastic Use", text: "You continue to use single-use plastics, contributing to pollution.", action: "Move back 1 space" },
      { id: 'cr3', heading: "Food Waste", text: "You regularly throw away food that could have been saved or composted thereby adding to landfills.", action: "Draw one more red card" },
      { id: 'cr4', heading: "Overconsumption of Fast Fashion", text: "You buy cheap, fast fashion clothes without considering its environmental cost.", action: "Move back 2 spaces" },
      { id: 'cr5', heading: "Energy Waste", text: "You leave lights, electronics, and appliances on when not in use, wasting energy despite attending the energy literacy campaign from the activist.", action: "You both take one step back" },
      { id: 'cr6', heading: "Ignoring Recycling", text: "You fail to separate your recyclables and dispose of them improperly.", action: "Go to the previous red spot" },
      { id: 'cr7', heading: "Air Travel", text: "You take unnecessary flights, even for shorter distances, adding a heavy carbon load to your lifestyle.", action: "Go back 3 spaces" },
      { id: 'cr8', heading: "Chemical-Heavy Cleaning Products", text: "You use chemical-heavy cleaning products that release GHGs, consume excessive energy in production, and pollute water systems.", action: "Draw the bad karma card" },
      { id: 'cr9', heading: "Deforestation", text: "Your purchasing habits encourage industries that contribute to excessive deforestation.", action: "Go 4 spots back" },
      { id: 'cr10', heading: "Overwatering Your Lawn", text: "You excessively water your garden or lawn, wasting water unnecessarily.", action: "Go back to the previous red spot" }
    ]
  },
  karma: {
    good: [
      { id: 'kg1', heading: "Clean Energy Success", text: "Your clean-energy efforts are becoming more and more local, gaining traction", action: "Take 5 steps ahead" },
      { id: 'kg2', heading: "Collaborative Success", text: "Climate movement is collaborative work and you understand that", action: "You both jump to your respective next green spots" }
    ],
    bad: [
      { id: 'kb1', heading: "Climate Catastrophe", text: "We are getting closer to a climate catastrophe and everyone including you has a role in it!", action: "Go back 5 steps!" },
      { id: 'kb2', heading: "Inconsistent Initiatives", text: "Your clean-energy initiatives are lacking consistency", action: "Switch places with your opponent, only if they are behind you" }
    ]
  }
};

const cardContent = {
  start: {
    heading: "Climate Gambit",
    text: ""
  }
};

const HolographicCard = () => {
  const cardRef = useRef(null);
  const styleRef = useRef(null);
  const [cardType, setCardType] = useState('start');
  const [isFlipping, setIsFlipping] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('activist');
  const [cardDecks, setCardDecks] = useState(INITIAL_CARD_DECKS);
  const [currentCard, setCurrentCard] = useState(cardContent.start);
  let timeoutId = null;

  // Card image mapping
  const cardImages = {
    start: '/cards/start.jpg',
    red: '/cards/red.jpg',
    green: '/cards/green.jpg',
    'good-karma': '/cards/good.jpg',
    'bad-karma': '/cards/bad.jpg'
  };

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = Object.values(cardImages).map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, []);

  const drawRandomCard = (type) => {
    // Handle karma cards separately
    if (type === 'good-karma') {
      const deck = cardDecks.karma.good;
      const randomIndex = Math.floor(Math.random() * deck.length);
      return deck[randomIndex];
    }
    if (type === 'bad-karma') {
      const deck = cardDecks.karma.bad;
      const randomIndex = Math.floor(Math.random() * deck.length);
      return deck[randomIndex];
    }

    // Handle regular cards - use the current player's deck
    const playerDeck = cardDecks[currentPlayer][type];
    if (!playerDeck || playerDeck.length === 0) {
      // Reset the deck if empty
      setCardDecks(prevDecks => ({
        ...prevDecks,
        [currentPlayer]: {
          ...prevDecks[currentPlayer],
          [type]: [...INITIAL_CARD_DECKS[currentPlayer][type]]
        }
      }));
      return INITIAL_CARD_DECKS[currentPlayer][type][0];
    }
    
    const randomIndex = Math.floor(Math.random() * playerDeck.length);
    const drawnCard = playerDeck[randomIndex];
    
    // Remove the drawn card from the deck
    setCardDecks(prevDecks => ({
      ...prevDecks,
      [currentPlayer]: {
        ...prevDecks[currentPlayer],
        [type]: playerDeck.filter((_, index) => index !== randomIndex)
      }
    }));
    
    return drawnCard;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;

      // Get card position
      const rect = card.getBoundingClientRect();
      const l = e.clientX - rect.left;
      const t = e.clientY - rect.top;
      
      // Calculate positions
      const h = card.offsetHeight;
      const w = card.offsetWidth;
      const px = Math.abs(Math.floor(100 / w * l)-100);
      const py = Math.abs(Math.floor(100 / h * t)-100);
      const pa = (50-px)+(50-py);

      // Calculate positions for gradient/background
      const lp = (50+(px - 50)/1.5);
      const tp = (50+(py - 50)/1.5);
      const px_spark = (50+(px - 50)/7);
      const py_spark = (50+(py - 50)/7);
      const p_opc = 20+(Math.abs(pa)*1.5);
      const ty = ((tp - 50)/2) * -1;
      const tx = ((lp - 50)/1.5) * .5;

      // Apply styles
      card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;
      
      const style = `
        .card:hover:before { background-position: ${lp}% ${tp}%; }
        .card:hover:after { background-position: ${px_spark}% ${py_spark}%; opacity: ${p_opc/100}; }
      `;
      
      if (styleRef.current) {
        styleRef.current.innerHTML = style;
      }
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      
      if (styleRef.current) {
        styleRef.current.innerHTML = '';
      }
      card.style.transform = '';
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        card.classList.add('animated');
      }, 2500);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const handleCardChange = (type) => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    const card = cardRef.current;
    
    // Start flip animation
    card.classList.add('flipping');
    
    // Change card type, image, and play sound halfway through the flip
    setTimeout(() => {
      if (type === 'start') {
        setCurrentCard(cardContent.start);
      } else {
        const drawnCard = drawRandomCard(type);
        setCurrentCard(drawnCard);
      }
      
      setCardType(type);
      card.style.backgroundImage = `url(${cardImages[type]})`;
      
      if (type !== 'start') {
        // Only switch turns if it's not a karma card and the action doesn't involve drawing another card
        const shouldKeepTurn = type === 'good-karma' || 
                             type === 'bad-karma' || 
                             (currentCard?.action?.toLowerCase().includes('draw'));
        
        if (!shouldKeepTurn) {
          setCurrentPlayer(currentPlayer === 'activist' ? 'citizen' : 'activist');
        }
      }
      
      // Play sound effects based on card type
      if (type === 'good-karma') {
        const sound = new Audio('/public/sounds/golden-card.mp3');
        sound.volume = 0.3;
        sound.play().catch(error => {
          console.log("Sound effect playback failed:", error);
        });
      } else if (type === 'bad-karma') {
        const sound = new Audio('/public/sounds/bad-karma.mp3');
        sound.volume = 0.3;
        sound.play().catch(error => {
          console.log("Sound effect playback failed:", error);
        });
      }
    }, 500);

    // Remove flipping class after animation completes
    setTimeout(() => {
      card.classList.remove('flipping');
      setIsFlipping(false);
    }, 1000);
  };

  const handleSkipTurn = () => {
    setCurrentPlayer(currentPlayer === 'activist' ? 'citizen' : 'activist');
    setCardType('start');
    setCurrentCard(cardContent.start);
    setCardDecks(INITIAL_CARD_DECKS);
  };

  // Make handleCardChange accessible outside the component
  window.skipToStart = () => {
    setCardType('start');
    setCurrentPlayer('activist');
    setCurrentCard(cardContent.start);
    setCardDecks(INITIAL_CARD_DECKS);
  };

  return (
    <div className="card-container" data-card-type={cardType}>
      <div className="turn-indicator">
        Next Turn: {currentPlayer === 'activist' ? 'Activist' : 'Citizen'}
      </div>
      <style ref={styleRef}></style>
      <div 
        ref={cardRef} 
        className={`card ${cardType} animated ${imagesLoaded ? 'loaded' : ''}`}
        style={{ 
          backgroundImage: `url(${cardImages[cardType]})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          opacity: imagesLoaded ? 1 : 0
        }}
      >
        {cardType !== 'start' && (
          <div className="card-content">
            <h2 
              className="card-heading"
              style={{ 
                fontSize: '1.5rem',
                marginBottom: '0.5rem'
              }}
            >
              {currentCard.heading}
            </h2>
            <p className="card-text">{currentCard.text}</p>
            <p className="card-action">{currentCard.action}</p>
          </div>
        )}
      </div>
      <div className="button-container">
        <button 
          className="card-button red"
          onClick={() => handleCardChange('red')}
        >
          Red
        </button>
        <button 
          className="card-button green"
          onClick={() => handleCardChange('green')}
        >
          Green
        </button>
        <button 
          className="card-button skip"
          onClick={handleSkipTurn}
          style={{
            backgroundColor: '#444',
            color: 'white',
          }}
        >
          Skip Turn
        </button>
        <button 
          className="card-button good-karma"
          onClick={() => handleCardChange('good-karma')}
        >
          Good Karma
        </button>
        <button 
          className="card-button bad-karma"
          onClick={() => handleCardChange('bad-karma')}
        >
          Bad Karma
        </button>
      </div>
    </div>
  );
};

export default HolographicCard; 