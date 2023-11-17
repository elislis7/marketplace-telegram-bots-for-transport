// /* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import styles from './BotBody.module.scss';
import { useWindowSize } from '../../context/WindowSizeContext';
import PopupWithInfo from '../UI/PopupWithInfo/PopupWithInfo';

function Botbody({
  botName,
  botAuthor,
  botCategory,
  botDescription,
  botImage,
  comeBack,
}) {
  const isMobile = useWindowSize();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    const currentURL = window.location.href;

    const textArea = document.createElement('textarea');
    textArea.value = currentURL;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className={styles.botBody}>
      {isMobile ? (
        <>
          <div className={styles.botBody__buttonSection}>
            <button
              className={styles.botBody__backButton}
              aria-label='кнопка'
              onClick={comeBack}
            />
            <div className={styles.botBody__linkLikeSection}>
              <button
                className={styles.botBody__favoritesButton}
                aria-label='кнопка'
              />
              <button
                className={styles.botBody__linkButton}
                aria-label='кнопка'
                onClick={copyToClipboard}
              />
              {copied ? <PopupWithInfo copied={copied} /> : ''}
            </div>
          </div>
          <img
            className={styles.botBody__image}
            src={botImage}
            alt='изображение логотипа бота'
          />
          <h2 className={styles.botBody__title}>{botName}</h2>
          <p className={styles.botBody__subtitle}>@{botAuthor}</p>
          <p className={styles.botBody__category}>{botCategory}</p>
          <p
            className={`${styles.botBody__description} ${
              isDescriptionExpanded ? styles.botBody__descriptionExpanded : ''
            }`}
          >
            {botDescription}
          </p>
          <button
            className={`${styles.botBody__showMoreButton}
          ${
            isDescriptionExpanded
              ? styles.botBody__showMoreButton_arrowUp
              : styles.botBody__showMoreButton_arrowDown
          }
          `}
            onClick={toggleDescription}
          >
            {isDescriptionExpanded
              ? 'Скрыть полный текст'
              : 'Показать полный текст'}
          </button>
        </>
      ) : (
        <>
          <img
            className={styles.botBody__image}
            src={botImage}
            alt='изображение логотипа бота'
          />
          <div className={styles.botBody__info}>
            <div className={styles.botBody__name}>
              <h2 className={styles.botBody__title}>{botName}</h2>
              <div className={styles.botBody__linkLikeSection}>
                <button
                  className={styles.botBody__favoritesButton}
                  aria-label='кнопка'
                />
                <button
                  className={styles.botBody__linkButton}
                  aria-label='кнопка'
                  onClick={copyToClipboard}
                />
                {copied ? <PopupWithInfo copied={copied} /> : ''}
              </div>
            </div>
            <p className={styles.botBody__subtitle}>@{botAuthor}</p>
            <p className={styles.botBody__subtitle_category}>{botCategory}</p>
            <p
              className={`${styles.botBody__description} ${
                isDescriptionExpanded ? styles.botBody__descriptionExpanded : ''
              }`}
            >
              {botDescription}
            </p>
            <button
              className={`${styles.botBody__showMoreButton}
          ${
            isDescriptionExpanded
              ? styles.botBody__showMoreButton_arrowUp
              : styles.botBody__showMoreButton_arrowDown
          }
          `}
              onClick={toggleDescription}
            >
              {isDescriptionExpanded
                ? 'Скрыть полный текст'
                : 'Показать полный текст'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Botbody;
