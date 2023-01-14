import { Card, Col, Row, Button } from 'react-bootstrap';
import { FormatProvider } from '../../FormatProvider';
import { get_value } from '../functiones';

import { VarText } from '../VarText';

export const Cards = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var options = props['options'] || [];

    return (
        <>
        <Row 
            xs={options?.grid?.sm || 1}
            md={options?.grid?.md || options?.grid?.sm || 1}
            lg={options?.grid?.lg || options?.grid?.md || options?.grid?.sm || 1}
            xl={options?.grid?.xl || options?.grid?.lg || options?.grid?.md || options?.grid?.sm || 1}
            xxl={options?.grid?.xxl || options?.grid?.xl || options?.grid?.lg || options?.grid?.md || options?.grid?.sm || 1}
            className="g-4"
        >
            { data.map((item, i) => 
                <>
                <Col>
                    <Card border={options?.border || ''} bg={options?.bg} text={options?.color ? options?.color : (options?.bg === 'light' || options?.bg == null) ? 'dark' : 'white'}>
                        { options?.header && !options.img ? (
                            <Card.Header>
                                <FormatProvider 
                                    value={get_value(options.header.value, item, (options.header.space || null))} 
                                    format={options.header.format || null}
                                    pos={options.header?.pos || 'start'} 
                                    display={options.header.display || null}
                                    fixes={options.header.fixes || null}
                                    suffix={options.header.suffix || null}
                                />
                            </Card.Header>
                        ) : ""}
                        { options?.img || options?.baseurl ? (
                            <Card.Img variant='top' src={(options.img?.baseurl || "") + (item[options.img.img] || "")}/>
                        ) : ""}
                        <Card.Body>
                            <>
                            { options?.body?.title ? (
                                <Card.Title>
                                    <FormatProvider
                                        value={get_value(options.body.title, item, (options.body.space || null))} 
                                        format={options.body.format || null}
                                        pos={options.body?.pos || 'start'} 
                                        display={options.body.display || null}
                                        fixes={options.body.fixes || null}
                                        suffix={options.body.suffix || null}
                                    />
                                </Card.Title>
                            ) : ""}
                            { options?.body?.subtitle ? (
                                <Card.Subtitle className="mb-2 text-muted">
                                    <FormatProvider
                                        value={get_value(options.body.subtitle, item, (options.body.space || null))} 
                                        format={options.body.format || null}
                                        pos={options.body?.pos || 'start'} 
                                        display={options.body.display || null}
                                        fixes={options.body.fixes || null}
                                        suffix={options.body.suffix || null}
                                    />
                                </Card.Subtitle>
                            ) : ""}
                            { options?.body?.content ? (
                                <Card.Text>
                                    <VarText data={item}>
                                        {options.body.content}
                                    </VarText>
                                </Card.Text>
                            ) : ""}
                            </>
                            { options?.button ? (
                                <Button variant={options.button.variant || 'primary'} onClick={options.button.function || null} disabled={options.button.function ? false : true}>
                                    {options.button.label}
                                </Button>
                            ) : ""}
                        </Card.Body>
                        { options?.footer ? (
                            <Card.Footer className="text-muted">
                                <FormatProvider
                                    value={get_value(options.footer.value, item, (options.footer.space || null))} 
                                    format={options.footer.format || null}
                                    pos={options.footer.pos || 'center'} 
                                    display={options.footer.display || null}
                                    fixes={options.footer.fixes || null}
                                    suffix={options.footer.suffix || null}
                                />
                            </Card.Footer>
                        ) : ""}
                    </Card>
                </Col>
                </>
            )}
        </Row>
        </>
    )
}