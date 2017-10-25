describe('Application specs', function() {
    before(() => {
      var html = document.createElement('rotateImage'),
          path = location.href;
      document.body.appendChild(html);
      tag = riot.mount('rotateImage')[0];
    });

    it('mounts a rotateImage tag', () => {
      expect(tag).to.exist;
      expect(tag.isMounted).to.be.true;
    });

    it('initial status and set element', () => {
      expect(tag.is_container).to.equal(false);
      expect(tag.count).to.equal(0);
      expect(tag.rotate).to.equal(0);
      expect(tag.now_rotate).to.equal(0);
      expect(tag.width).to.equal(0);
      expect(tag.height).to.equal(0);
      expect(tag.rotate_img[0]).to.have.class('rotate_image');
      expect(tag.img).to.deep.equal(new Image());
      expect(tag.org_img).to.deep.equal(new Image());
      var container = document.querySelector('.rotate_image_container');
      var rotate_button = document.querySelector('.rotate_button');
      var delete_button = document.querySelector('.delete_button');
      expect(container).to.exist;
      expect(container).to.contain('.rotate_button');
      expect(rotate_button).to.contain("button[name='left']");
      expect(rotate_button).to.contain("button[name='right']");
      expect(delete_button).to.contain("button[name='save']");
      expect(delete_button).to.contain("button[name='delete']");
    });

    it('load img', (done) => {
      tag.loadimg({
          src: 'img/test.jpg',
      }).then((img) => {
          tag.img = img,
          tag.width = img.width,
          tag.height = img.height;
          tag.org_img.src = `img/test.jpg?date=${Date.now()}`;
          tag.rotate_img[0].appendChild(img);
      }).then(done, done);
    });

    it('after load img', () => {
      expect(tag.rotate_img[0]).to.contain('img');
    });
})
