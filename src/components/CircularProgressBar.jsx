import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Asigură-te că importi și stilurile

function CircularProgressBar({ value, maxValue, text, color, title }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', marginBottom: '10px' }}>
                <CircularProgressbar
                    value={value}
                    maxValue={maxValue}
                    text={text}
                    styles={buildStyles({
                        pathColor: color,
                        trailColor: "#d6d6d6",
                        textSize: "16px",
                        textColor: "currentColor"
                    })}
                    aria-label={text} // Folosim aria-label pentru accesibilitate
                />
            </div>
            <div className="progress-title" style={{ fontWeight: 'bold' }}>{title}</div>
        </div>
    );
}

CircularProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default CircularProgressBar;
