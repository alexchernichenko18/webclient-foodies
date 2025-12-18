import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss'; 
import userInfoStyles from '../../components/UserInfo/UserInfo.module.scss';
import Button from '../../components/ui/Button/Button';
import { User, userApi } from '../../api/userApi';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'recipes' | 'followers'>('recipes');

  // --- FOR TESTING (Mock data) ---
  const [user, setUser] = useState<Partial<User> | null>({
    name: "Nadia",
    email: "nadia28682@gmai.com",
    avatar: "", 
    recipesAmount: 4,
    followersAmount: 5
  });

  // Mock list of followers for testing
  const [followers, setFollowers] = useState([
    { id: '1', name: 'Oleg Test', email: 'oleg@gmail.com' },
    { id: '2', name: 'Anna Cook', email: 'anna@gmail.com' },
    { id: '3', name: 'John Foodie', email: 'john@gmail.com' },
  ]);

  // --- FOR REAL API (Uncomment this and comment out the blocks above) ---
  /*
  const [user, setUser] = useState<User | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      userApi.getUserById(id).then(res => setUser(res.data));
      // Add followers fetch here when API is ready
      // userApi.getFollowers(id).then(res => setFollowers(res.data));
    }
  }, [id]);
  */

  if (!user) return null;

  const avatar = user.avatar ? (
    <img
      src={process.env.REACT_APP_BASE_URL_API + user.avatar}
      alt="Avatar"
      className={userInfoStyles.avatar}
    />
  ) : (
    <div className={userInfoStyles.defaultAvatar}>{user.name?.charAt(0)}</div>
  );

  return (
    <section className={`f-container ${styles.page}`}>
      <header className={styles.header}>
        <h1>USER PROFILE</h1>
        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </header>

      <div className={styles.layout}>
        <div className={userInfoStyles.profileWrapper}>
          <div className={userInfoStyles.card}>
            <div className={userInfoStyles.header}>
              <div className={userInfoStyles.avatarContainer}>
                <div className={userInfoStyles.avatarBox}>{avatar}</div>
              </div>
              <p className={userInfoStyles.name}>{user.name}</p>
            </div>

            <ul className={userInfoStyles.stats}>
              <li>
                <p className={userInfoStyles.textProfile}>
                  Email:<span className={userInfoStyles.textValueProfile}>{user.email}</span>
                </p>
              </li>
              <li>
                <p className={userInfoStyles.textProfile}>
                  Added recipes:<span className={userInfoStyles.textValueProfile}>{user.recipesAmount}</span>
                </p>
              </li>
              <li>
                <p className={userInfoStyles.textProfile}>
                  Followers:<span className={userInfoStyles.textValueProfile}>{user.followersAmount}</span>
                </p>
              </li>
            </ul>
          </div>
          
          <Button variant="dark" expanded onClick={() => console.log('Followed!')}>
            FOLLOW
          </Button>
        </div>

        <main className={styles.main}>
          {/* Tabs Navigation */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', borderBottom: '1px solid #e0e0e0' }}>
            <button 
              onClick={() => setActiveTab('recipes')}
              style={{ 
                padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700,
                borderBottom: activeTab === 'recipes' ? '2px solid black' : 'none'
              }}
            >
              RECIPES
            </button>
            <button 
              onClick={() => setActiveTab('followers')}
              style={{ 
                padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700,
                borderBottom: activeTab === 'followers' ? '2px solid black' : 'none'
              }}
            >
              FOLLOWERS
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'recipes' ? (
              <div className={styles.recipesGrid}>
                <p>No recipes yet.</p>
              </div>
            ) : (
              <div className={styles.followersList} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {followers.map(follower => (
                  <div key={follower.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px', 
                    border: '1px solid #eee', 
                    borderRadius: '15px' 
                  }}>
                    <div className={userInfoStyles.defaultAvatar} style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                      {follower.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '14px' }}>{follower.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{follower.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;