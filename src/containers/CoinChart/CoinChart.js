import React, { Component } from 'react';

class CoinChart extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextStates) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    componentDidMount() {
        this.refresh = setInterval(() => {
            this.refreshChart();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.refresh);
    }

    refreshChart() {
        const { width, height, data } = this.props;

        if (data) {
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');

            let min = Math.min(...data.map((e) => e.low_price));
            let max = Math.max(...data.map((e) => e.high_price));
            const diff = (max - min) / (height - 20);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '10px Arial';
            for (let i = data.length - 1, j = 0; i >= 0; i-- , j++) {
                ctx.beginPath();
                if (data[i].high_price === data[i].low_price) {
                    ctx.moveTo(10 + j * 15 , (max - data[i].high_price) / diff);
                    ctx.lineTo(10 + j * 15 + 10, (max - data[i].high_price) / diff);
                } else {
                    ctx.moveTo(10 + j * 15 + 5, (max - data[i].high_price) / diff);
                    ctx.lineTo(10 + j * 15 + 5, (max - data[i].low_price) / diff);
                }
                ctx.stroke();

                let start;
                if (data[i].opening_price < data[i].trade_price) {
                    ctx.fillStyle = '#FF0000';
                    start = data[i].trade_price;
                } else {
                    ctx.fillStyle = '#0000FF';
                    start = data[i].opening_price;
                }
                ctx.fillRect(10 + j * 15, (max - start) / diff, 10, Math.abs(data[i].opening_price - data[i].trade_price) / diff);

                const time = data[i].candle_date_time_kst.replace(/\d{4}-\d{2}-\d{2}T/, '').substr(0, 5);
            }

            ctx.beginPath();
            ctx.moveTo(0, height - 10);
            ctx.lineTo(width - 50, height - 10);
            ctx.lineTo(width - 50, 0);
            ctx.stroke();

            let start;
            if (data[0].opening_price < data[0].trade_price) {
                start = data[0].trade_price;
            } else {
                start = data[0].opening_price;
            }

            const itemHeight = (max - start + Math.abs(data[0].opening_price - data[0].trade_price)) / diff;
            ctx.beginPath();
            ctx.moveTo(width - 60, itemHeight);
            ctx.lineTo(width - 45, itemHeight - 7);
            ctx.lineTo(width, itemHeight - 7);
            ctx.lineTo(width, itemHeight + 7);
            ctx.lineTo(width - 45, itemHeight + 7);
            ctx.fill();

            ctx.font = '10px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(data[0].trade_price, width - 45, itemHeight + 5);

            // name
            ctx.fillStyle = '#000000';
            ctx.fillText(data[0].market, 0, 20);
        }
    }

    render() {
        const { width, height } = this.props;
        const inlineStyle = {
            display: 'inline-block',
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
        };
        const position = {
            position: 'absolute',
            top: '0',
            left: '0',
        }

        return (
            <div style={inlineStyle}>
                <canvas ref="canvas" width={width} height={height} style={position} />
            </div>
        )
    }
}

export default CoinChart;