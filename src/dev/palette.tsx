import { Category, Component, Palette, Variant } from '@react-buddy/ide-toolbox';
import { UserIcon } from 'lucide-react';

import Badge from '_components/ui/Badge';
import Button from '_components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '_components/ui/Card';
import Typography from '_components/ui/Typography';

export const PaletteTree = () => (
  <Palette className='container'>
    <Category name='Buttons'>
      <Component name='Button'>
        <Variant name='Default'>
          <Button>Default</Button>
        </Variant>
        <Variant name='Outline'>
          <Button variant='outline'>Outline</Button>
        </Variant>
        <Variant name='Secondary'>
          <Button variant='secondary'>Secondary</Button>
        </Variant>
        <Variant name='Secondary outline'>
          <Button variant='outline-secondary'>Secondary outline</Button>
        </Variant>
        <Variant name='Ghost'>
          <Button variant='ghost'>Ghost</Button>
        </Variant>
        <Variant name='Destructive'>
          <Button variant='destructive'>Destructive</Button>
        </Variant>
        <Variant name='Destructive outline'>
          <Button variant='outline-destructive'>Destructive outline</Button>
        </Variant>
        <Variant name='Link'>
          <Button variant='link'>Link</Button>
        </Variant>
      </Component>
    </Category>
    <Category name='Typography'>
      <Component name='Typography'>
        <Variant name='h1'>
          <Typography variant='h1'>Heading 1</Typography>
        </Variant>
        <Variant name='h2'>
          <Typography variant='h2'>Heading 2</Typography>
        </Variant>
        <Variant name='h3'>
          <Typography variant='h3'>Heading 3</Typography>
        </Variant>
        <Variant name='h4'>
          <Typography variant='h4'>Heading 4</Typography>
        </Variant>
        <Variant name='h5'>
          <Typography variant='h5'>Heading 5</Typography>
        </Variant>
        <Variant name='h6'>
          <Typography variant='h6'>Heading 6</Typography>
        </Variant>
        <Variant name='default'>
          <Typography variant='div'>Default typography</Typography>
        </Variant>
        <Variant name='bold'>
          <Typography fontStyle='bold'>Bold</Typography>
        </Variant>
        <Variant name='italic'>
          <Typography fontStyle='italic'>Italic</Typography>
        </Variant>
      </Component>
    </Category>
    <Category name='Cards'>
      <Component name='Basic card'>
        <Variant name='Outlined'>
          <Card variant='outlined'>
            <CardHeader>
              <CardTitle>Outlined card title</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ducimus.
              </Typography>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor dolorum
                incidunt iure tenetur? Aut odio placeat voluptatum. Assumenda atque autem, commodi
                consectetur dolores, eum iusto laborum libero nobis odit pariatur praesentium quia
                veniam. Cupiditate eligendi illo labore quaerat vitae.
              </Typography>
            </CardContent>
          </Card>
        </Variant>
        <Variant name='Outlined with shadow'>
          <Card variant='outlined' shadow='default'>
            <CardHeader>
              <CardTitle>Outlined card title</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ducimus.
              </Typography>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor dolorum
                incidunt iure tenetur? Aut odio placeat voluptatum. Assumenda atque autem, commodi
                consectetur dolores, eum iusto laborum libero nobis odit pariatur praesentium quia
                veniam. Cupiditate eligendi illo labore quaerat vitae.
              </Typography>
            </CardContent>
          </Card>
        </Variant>
        <Variant name='Outlined with small shadow on hover'>
          <Card variant='outlined' shadow='hover-sm'>
            <CardHeader>
              <CardTitle>Outlined card title</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ducimus.
              </Typography>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor dolorum
                incidunt iure tenetur? Aut odio placeat voluptatum. Assumenda atque autem, commodi
                consectetur dolores, eum iusto laborum libero nobis odit pariatur praesentium quia
                veniam. Cupiditate eligendi illo labore quaerat vitae.
              </Typography>
            </CardContent>
          </Card>
        </Variant>
        <Variant name='Contained (default)'>
          <Card>
            <CardHeader>
              <CardTitle>Contained (default) card title</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ducimus.
              </Typography>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor dolorum
                incidunt iure tenetur? Aut odio placeat voluptatum. Assumenda atque autem, commodi
                consectetur dolores, eum iusto laborum libero nobis odit pariatur praesentium quia
                veniam. Cupiditate eligendi illo labore quaerat vitae.
              </Typography>
            </CardContent>
          </Card>
        </Variant>
      </Component>
    </Category>
    <Category name='Badges'>
      <Component name='Badge'>
        <Variant name='default'>
          <Badge>Default badge</Badge>
        </Variant>
        <Variant name='secondary'>
          <Badge variant='secondary'>Secondary badge</Badge>
        </Variant>
        <Variant name='destructive'>
          <Badge variant='destructive'>Destructive badge</Badge>
        </Variant>
        <Variant name='outline'>
          <Badge variant='outline'>Outline badge</Badge>
        </Variant>
        <Variant name='with remove icon'>
          <Badge
            variant='outline'
            onRemoveClick={() => {
              // do nothing
            }}
          >
            Outline badge
          </Badge>
        </Variant>
        <Variant name='small with remove icon'>
          <Badge
            variant='outline'
            size='sm'
            onRemoveClick={() => {
              // do nothing
            }}
          >
            Outline badge
          </Badge>
        </Variant>
        <Variant name='outline secondary'>
          <Badge variant='outline-secondary'>Outline secondary badge</Badge>
        </Variant>
        <Variant name='outline destructive'>
          <Badge variant='outline-destructive'>Outline destructive badge</Badge>
        </Variant>
        <Variant name='small'>
          <Badge size='sm'>Small badge</Badge>
        </Variant>
        <Variant name='icon'>
          <Badge size='icon'>99+</Badge>
        </Variant>
        <Variant name='icon small'>
          <Badge size='icon-sm'>2</Badge>
        </Variant>
        <Variant name='icon large'>
          <Badge size='icon-lg'>
            <UserIcon />
          </Badge>
        </Variant>
      </Component>
    </Category>
  </Palette>
);
